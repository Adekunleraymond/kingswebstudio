/* King’s Web Studio: progressive enhancements; no client-side dependencies. */
(() => {
  "use strict";
  const whatsappNumber = "2349030969700";
  const studioEmail = "kingswebsiteexpert@gmail.com";
  const introduction = "Hello King’s Web Studio, I’m interested in building a website for my business. I’d like to discuss my project.";
  const whatsappUrl = (message) => "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
  document.querySelectorAll("[data-whatsapp]").forEach(link => { link.href = whatsappUrl(introduction); });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menu = document.getElementById("main-nav");
  const toggle = document.querySelector(".menu-toggle");
  const isMobile = window.matchMedia("(max-width: 1100px)");
  function closeMenu(returnFocus = false) {
    if (!menu || !toggle) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
    if (returnFocus) toggle.focus();
  }
  if (menu && toggle) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      document.body.classList.toggle("menu-open", open && isMobile.matches);
    });
    menu.addEventListener("click", event => {
      const link = event.target.closest("a");
      if (!link) return;
      closeMenu();
      if (isMobile.matches && link.hash) {
        const target = document.querySelector(link.hash);
        if (target) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      }
    });
    document.addEventListener("keydown", event => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") closeMenu(true);
      if (event.key === "Tab" && isMobile.matches) {
        const focusables = [toggle, ...menu.querySelectorAll("a")];
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    document.addEventListener("click", event => {
      if (!event.target.closest(".site-header") && toggle.getAttribute("aria-expanded") === "true") closeMenu();
    });
    isMobile.addEventListener("change", () => closeMenu());
  }

  const controls = document.querySelector(".portfolio-controls");
  const projects = [...document.querySelectorAll(".project[data-category]")];
  if (controls) {
    controls.hidden = false;
    controls.addEventListener("click", event => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      controls.querySelectorAll("button").forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      let count = 0;
      projects.forEach(project => {
        project.hidden = button.dataset.filter !== "all" && button.dataset.filter !== project.dataset.category;
        if (!project.hidden) { count++; project.classList.add("revealed"); }
      });
      document.getElementById("portfolio-status").textContent = count + (count === 1 ? " website concept" : " website concepts");
    });
  }

  const form = document.getElementById("project-form");
  const preview = document.getElementById("inquiry-preview");
  const messageField = document.getElementById("inquiry-message");
  document.querySelectorAll(".plan-cta").forEach(link => {
    link.addEventListener("click", () => {
      if (!form) return;
      document.getElementById("budget").value = link.dataset.budget;
      document.getElementById("selected-package").value = link.dataset.package;
      form.hidden = false;
      if (preview) preview.hidden = true;
    });
  });
  if (form && preview && messageField) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const value = key => String(data.get(key) || "").trim();
      if (!value("name") || !value("description")) {
        const field = document.getElementById(!value("name") ? "name" : "description");
        field.setCustomValidity("Please enter your " + (!value("name") ? "name." : "project description."));
        field.reportValidity();
        field.addEventListener("input", () => field.setCustomValidity(""), {once:true});
        return;
      }
      const lines = [introduction, "", "PROJECT INQUIRY", "Name: " + value("name"), "Email: " + value("email")];
      if (value("phone")) lines.push("Phone / WhatsApp: " + value("phone"));
      if (value("business")) lines.push("Business / Brand: " + value("business"));
      lines.push("Website type: " + value("type"), "Budget: " + (value("budget") || "Let’s discuss"));
      if (value("package")) lines.push("Package of interest: " + value("package"));
      lines.push("", "Project description:", value("description"));
      const message = lines.join("\n");
      messageField.value = message;
      document.getElementById("inquiry-whatsapp").href = whatsappUrl(message);
      document.getElementById("inquiry-email").href = "mailto:" + studioEmail + "?subject=" + encodeURIComponent("Website Project Inquiry" + (value("business") ? " — " + value("business") : "")) + "&body=" + encodeURIComponent(message);
      document.getElementById("copy-status").textContent = "";
      form.hidden = true;
      preview.hidden = false;
      preview.focus({ preventScroll: true });
      preview.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
    document.getElementById("edit-inquiry").addEventListener("click", () => {
      preview.hidden = true; form.hidden = false;
      document.getElementById("name").focus({ preventScroll:true });
      form.scrollIntoView({ behavior:"auto",block:"start" });
    });
    document.getElementById("copy-inquiry").addEventListener("click", async () => {
      const status = document.getElementById("copy-status");
      try {
        if (!navigator.clipboard) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(messageField.value);
        status.textContent = "Message copied. Paste it into WhatsApp or your email app when you’re ready.";
      } catch {
        messageField.focus(); messageField.select();
        status.textContent = "Your message is selected. Use your device’s Copy option, then paste it into WhatsApp or email.";
      }
    });
  }

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.05 });
    items.forEach(item => observer.observe(item));
    document.documentElement.classList.add("motion-ready");
    // Keep in-page navigation and Find-in-page reliable if animation is interrupted.
    document.addEventListener("beforematch", event => { event.target.closest(".reveal")?.classList.add("revealed"); });
  }
})();
