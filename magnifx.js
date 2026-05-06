/**
 * Magnifx
 * @author Andrea Gelmini
 * @version 1.0.0
 * @license MIT
 */
((window, document) => {
    const initializedElements = new WeakSet();

    class Magnifx {
        constructor(el, options = {}) {
            if (!el || initializedElements.has(el)) return;
            
            const dataConfig = el.hasAttribute('data-group-configs') ? JSON.parse(el.dataset.groupConfigs) : {};
            this.opts = Object.assign({
                listener: 'move',
                zoom: 2,
                speed: 200,
                smart: false,
                crosshair: true,
                style: true,
                wheelzoom: false
            }, options, dataConfig);

            this.isLocked = false; 

            if (this.opts.style) Magnifx.injectCSS();

            if (el.tagName !== 'IMG') {
                this.initGroup(el);
            } else {
                this.initSingleImage(el);
            }
        }

        static injectCSS() {
            if (document.getElementById('magnifx-style')) return;
            const style = document.createElement('style');
            style.id = 'magnifx-style';
            style.textContent = `
                body.magnifying { overflow-x: hidden; }
                .magnifx { position: relative; display: inline-block; cursor: none; vertical-align: top; }
                .magnifx img { display: block; max-width: 100%; height: auto; }
                .magnifx-lens {
                    position: absolute; z-index: 100;
                    width: 200px; height: 200px;
                    border-radius: 50%;
                    box-shadow: 0 0 0 7px rgba(255,255,255,.85), 0 0 7px 7px rgba(0,0,0,.25), inset 0 0 40px 2px rgba(0,0,0,.25);
                    pointer-events: none; opacity: 0; transition: opacity 0.2s;
                    background-repeat: no-repeat;
                    display: none;
                }
                .magnifx-loading { background: #333; }
                .magnifx-loading:before { 
                    content: 'Loading...'; color: #fff; position: absolute; 
                    top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px;
                }
                .magnifx-error { background: #f66; }
                .is-rectangular { border-radius: 4px; }
                .has-crosshair::before, .has-crosshair::after {
                    content: ''; position: absolute; background: rgba(255,0,0,0.4); pointer-events: none;
                }
                .has-crosshair::before { width: 1px; height: 100%; left: 50%; top: 0; }
                .has-crosshair::after { width: 100%; height: 1px; left: 0; top: 50%; }
            `;
            document.head.appendChild(style);
        }

        initGroup(container) {
            let images = container.querySelectorAll('img[data-magnifx-src]');
            if (!images.length) images = container.querySelectorAll('img');

            const instances = Array.from(images).map(img => this.createInstance(img));
            this.bindGroupEvents(container, instances);
        }

        initSingleImage(img) {
            const instance = this.createInstance(img);
            this.bindGroupEvents(instance.wrapper, [instance]);
        }

        createInstance(img) {
            initializedElements.add(img);
            
            const wrapper = document.createElement('div');
            wrapper.className = 'magnifx';
            img.parentNode.insertBefore(wrapper, img);
            
            const lens = document.createElement('div');
            lens.className = 'magnifx-lens magnifx-loading';
            
            if (this.opts.crosshair) lens.classList.add('has-crosshair');
            lens.style.transitionDuration = `${this.opts.speed}ms`;
            
            wrapper.appendChild(lens);
            wrapper.appendChild(img);

            const mImg = new Image();
            const state = { img, lens, wrapper, mImg, loaded: false };

            mImg.onload = () => {
                state.loaded = true;
                lens.classList.remove('magnifx-loading');
                let bimg = img.dataset.magnifxSrc ?? img.src;
                lens.style.backgroundImage = `url('${bimg}')`;

                if (this.opts.smart) {
                    const ratio = mImg.naturalHeight / mImg.naturalWidth;
                    const computedWidth = parseInt(window.getComputedStyle(lens).width) || 200;
                    lens.style.height = (computedWidth * ratio) + 'px';
                    lens.classList.add('is-rectangular');
                }
            };
            
            mImg.onerror = () => {
                lens.classList.remove('magnifx-loading');
                lens.classList.add('magnifx-error');
            };
            
            return state;
        }

        bindGroupEvents(container, instances) {
            const body = document.body;

            const showAll = () => {
                instances.forEach(inst => {
                    if (!inst.mImg.src) inst.mImg.src = inst.img.dataset.magnifxSrc ?? inst.img.src;
                    inst.lens.style.display = 'block';
                    setTimeout(() => inst.lens.style.opacity = 1, 10);
                });
                body.classList.add('magnifying');
            };

            const hideAll = () => {
                instances.forEach(inst => inst.lens.style.opacity = 0);
                body.classList.remove('magnifying');
            };

            const moveAll = (e) => {
                const target = e.target.closest('.magnifx');
                if (!target) return;

                const rect = target.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                const relY = (e.clientY - rect.top) / rect.height;

                instances.forEach(inst => this.updateLens(inst, relX, relY));
            };

            if (this.opts.listener === 'click') {
                container.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.isLocked = !this.isLocked;
                    this.isLocked ? showAll() : hideAll();
                    if(this.isLocked) moveAll(e);
                });
            } else {
                container.addEventListener('mouseenter', showAll);
                container.addEventListener('mouseleave', hideAll);
            }

            container.addEventListener('mousemove', (e) => {
                if (this.opts.listener === 'click' && !this.isLocked) return;
                moveAll(e);
            });

            // Handle global zoom level via wheel
            if (this.opts.wheelzoom) {
                container.addEventListener('wheel', (e) => {
                    if (body.classList.contains('magnifying')) {
                        e.preventDefault(); 

                        const delta = e.deltaY > 0 ? -0.2 : 0.2;
                        this.opts.zoom = Math.max(1, Math.min(10, this.opts.zoom + delta));
                        
                        const target = e.target.closest('.magnifx');
                        if (!target) return;
                        
                        const rect = target.getBoundingClientRect();
                        const relX = (e.clientX - rect.left) / rect.width;
                        const relY = (e.clientY - rect.top) / rect.height;

                        instances.forEach(inst => {
                            if (inst.loaded) this.updateLens(inst, relX, relY);
                        });
                    }
                }, { passive: false });
            } 
        }

        updateLens(inst, relX, relY) {
            const { lens, wrapper, mImg, loaded } = inst;
            
            const x = relX * wrapper.offsetWidth;
            const y = relY * wrapper.offsetHeight;

            lens.style.left = `${x - lens.offsetWidth / 2}px`;
            lens.style.top = `${y - lens.offsetHeight / 2}px`;

            if (loaded) {
                const bgX = (relX * mImg.width - lens.offsetWidth / 2) * -1;
                const bgY = (relY * mImg.height - lens.offsetHeight / 2) * -1;
                
                lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
                // Zoom factor logic: scale background relative to original source
                lens.style.backgroundSize = `${mImg.width * (this.opts.zoom / 2)}px auto`;
            }
        }
    }

    window.magnifx = (el, opts) => new Magnifx(el, opts);

})(window, document);