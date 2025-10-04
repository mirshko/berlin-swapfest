/* eslint-disable unicorn/require-module-specifiers */
/* eslint-disable unicorn/no-null */

class ImageLightbox extends HTMLElement {
  private dialog: HTMLDialogElement | null = null;
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

    // Create dialog
    this.dialog = document.createElement("dialog");
    this.dialog.className = "image-lightbox-dialog";

    // Create cloned image
    this.image = document.createElement("img");
    this.image.src = sourceImg.src;
    this.image.alt = sourceImg.alt;
    this.image.className = "image-lightbox-image";

    this.dialog.append(this.image);
    document.body.append(this.dialog);

    // Show modal with animation
    this.dialog.showModal();

    // Trigger animation after dialog is shown
    requestAnimationFrame(() => {
      if (this.dialog) {
        this.dialog.dataset.state = "open";
      }
      if (this.image) {
        this.image.dataset.state = "open";
      }
    });

    // Add event listeners
    this.dialog.addEventListener("click", this.handleDialogClick.bind(this));
    this.dialog.addEventListener("cancel", this.handleCancel.bind(this));
    this.image.addEventListener("click", this.handleImageClick.bind(this));
    document.addEventListener("wheel", this.handleScroll.bind(this));
  }

  private handleDialogClick(event: Event) {
    if (event.target === this.dialog) {
      this.closeLightbox();
    }
  }

  private handleImageClick(event: Event) {
    event.stopPropagation();
    this.closeLightbox();
  }

  private handleCancel(event: Event) {
    event.preventDefault();
    this.closeLightbox();
  }

  private handleScroll(event: WheelEvent) {
    if (this.isOpen) {
      event.preventDefault();
      this.closeLightbox();
    }
  }

  private closeLightbox() {
    if (!this.isOpen || !this.dialog || !this.image) return;

    this.isOpen = false;

    // Animate out
    this.dialog.dataset.state = "closing";
    this.image.dataset.state = "closing";

    setTimeout(() => {
      this.cleanup();
    }, 300);
  }

  private cleanup() {
    if (this.dialog) {
      this.dialog.close();
      this.dialog.remove();
      this.dialog = null;
    }

    this.image = null;
    document.removeEventListener("wheel", this.handleScroll);
  }
}

customElements.define("image-lightbox", ImageLightbox);

export {};
