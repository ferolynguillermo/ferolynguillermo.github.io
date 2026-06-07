(function () {
  const config = window.PROFILE_SITE || {};

  function setText(field, value) {
    if (!value) return;
    document.querySelectorAll(`[data-site-field="${field}"]`).forEach((element) => {
      element.textContent = value;
    });
  }

  function setContentAttribute(field, value) {
    if (!value) return;
    document.querySelectorAll(`[data-site-field="${field}"]`).forEach((element) => {
      element.setAttribute("content", value);
    });
  }

  function setHref(field, value) {
    if (!value) return;
    document.querySelectorAll(`[data-site-field="${field}"]`).forEach((element) => {
      element.setAttribute("href", value);
    });
  }

  setText("pageTitle", config.pageTitle);
  setText("name", config.name);
  setText("eyebrow", config.eyebrow);
  setText("headline", config.headline);
  setText("summary", config.summary);
  setText("aboutTitle", config.aboutTitle);
  setText("aboutBody", config.aboutBody);
  setText("contactTitle", config.contactTitle);
  setText("contactBody", config.contactBody);
  setText("footerYear", String(new Date().getFullYear()));

  if (config.pageTitle) document.title = config.pageTitle;

  setContentAttribute("metaDescription", config.metaDescription);
  setContentAttribute("ogTitle", config.pageTitle);
  setContentAttribute("ogDescription", config.metaDescription);
  setContentAttribute("ogUrl", config.canonicalUrl);
  setContentAttribute("ogImage", config.publicProfileImage);
  setContentAttribute("twitterTitle", config.pageTitle);
  setContentAttribute("twitterDescription", config.metaDescription);
  setContentAttribute("twitterImage", config.publicProfileImage);
  setHref("canonicalUrl", config.canonicalUrl);

  if (config.profileImage) {
    document.querySelectorAll('[data-site-field="profileImage"]').forEach((image) => {
      image.setAttribute("src", config.profileImage);
      image.setAttribute("alt", `${config.name || "Profile"} portrait placeholder`);
    });
  }

  if (config.email) {
    const emailHref = `mailto:${config.email}`;
    setHref("emailHref", emailHref);
    document.querySelectorAll('[data-site-field="emailHref"]').forEach((element) => {
      if (element.textContent.includes("@")) element.textContent = config.email;
    });
  }

  if (Array.isArray(config.highlights)) {
    const container = document.querySelector('[data-site-field="highlights"]');
    if (container) {
      container.innerHTML = "";
      config.highlights.forEach((item, index) => {
        const article = document.createElement("article");
        article.className = "highlight-card";
        article.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><h3></h3><p></p>`;
        article.querySelector("h3").textContent = item.title || "";
        article.querySelector("p").textContent = item.body || "";
        container.appendChild(article);
      });
    }
  }

  if (Array.isArray(config.links)) {
    const container = document.querySelector('[data-site-field="links"]');
    if (container) {
      container.innerHTML = "";
      config.links.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.url || "#";
        link.textContent = item.label || item.url || "Link";
        container.appendChild(link);
      });
    }
  }

  const schema = document.getElementById("person-schema");
  if (schema) {
    schema.textContent = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: config.name || "Your Name",
        url: config.canonicalUrl || "https://example.com/",
        image: config.publicProfileImage || "https://example.com/assets/profile-placeholder.svg",
        jobTitle: config.jobTitle || "Your Title",
        description: config.metaDescription || config.summary || "",
        email: config.email ? `mailto:${config.email}` : undefined,
        sameAs: (config.links || []).map((link) => link.url).filter(Boolean),
        knowsAbout: config.knowsAbout || []
      },
      null,
      2
    );
  }
})();
