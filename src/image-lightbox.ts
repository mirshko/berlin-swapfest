/* eslint-disable unicorn/no-null */

class ImageLightbox extends HTMLElement {
  private overlay: HTMLDivElement | null = null;
  private image: HTMLImageElement | null = null;
  private isOpen = false;

  connectedCallback() {
    this.addEventListener("click", this.handleClick.bind(this));
    this.style.cursor = "zoom-in";
    this.style.display = "block";
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
    this.cleanup();
  }

  private handleClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const img = this.querySelector("img");
    if (img && !this.isOpen) {
      this.openLightbox(img);
    }
  }

  private openLightbox(sourceImg: HTMLImageElement) {
    this.isOpen = true;

    // Create overlay
    this.overlay = document.createElement("div");
    this.overlay.className = "image-lightbox-overlay";
    this.overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;

    // Create cloned image
    this.image = document.createElement("img");
    this.image.src = sourceImg.src;
    this.image.alt = sourceImg.alt;
    this.image.className = "image-lightbox-image";

    this.image.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 8px;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform: scale(0.8);
        opacity: 0;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      `;

    this.overlay.append(this.image);
    document.body.append(this.overlay);

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Animate in
    requestAnimationFrame(() => {
      if (this.overlay && this.image) {
        this.overlay.style.background = "rgba(0, 0, 0, 0.5)";
        this.overlay.style.opacity = "1";
        this.image.style.transform = "scale(1)";
        this.image.style.opacity = "1";
      }
    });

    // Add event listeners
    this.overlay.addEventListener("click", this.handleOverlayClick.bind(this));
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  private handleOverlayClick(event: Event) {
    if (event.target === this.overlay) {
      this.closeLightbox();
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closeLightbox();
    }
  }

  private closeLightbox() {
    if (!this.isOpen || !this.overlay || !this.image) return;

    this.isOpen = false;

    // Animate out
    this.overlay.style.background = "rgba(0, 0, 0, 0)";
    this.overlay.style.opacity = "0";
    this.image.style.transform = "scale(0.9)";
    this.image.style.opacity = "0";

    setTimeout(() => {
      this.cleanup();
    }, 300);
  }

  private cleanup() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }

    this.image = null;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.handleKeydown);
  }
}

customElements.define("image-lightbox", ImageLightbox);

export {};
