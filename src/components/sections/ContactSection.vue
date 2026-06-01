<template>
  <section id="contact" class="py-24 px-8 md:px-16 bg-surface text-center">
    <div class="max-w-2xl mx-auto">
      <span class="section-label">Contact</span>
      <h2 class="section-title">Travaillons ensemble</h2>
      <p class="section-sub mx-auto text-center">
        Je suis à la recherche d'un stage PFA en IA, Data Engineering & Développement Logiciel, idéalement à l'intersection de ces trois domaines.
        N'hésitez pas à me contacter !
      </p>

      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <a href="mailto:andriamasylorraine@gmail.com" class="contact-link">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          andriamasylorraine@gmail.com
        </a>
        <a href="tel:+212770333741" class="contact-link">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.15 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.07 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          +212 770 333 741
        </a>
        <a href="https://github.com/Lorraine301" target="_blank" class="contact-link">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/andriamasy-lorraine-agn%C3%A8s-raheliarisoa-a16a21278/" target="_blank" class="contact-link">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/>
          </svg>
          LinkedIn
        </a>
      </div>

      <!-- Footer -->
      <div class="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
        <span>© 2026 Andriamasy Lorraine Agnès RAHELIARISOA</span>
        <span class="font-syne font-extrabold text-accent text-base">LARA.</span>
        <span>Tanger, Maroc 🇲🇦</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-link {
  @apply flex items-center gap-2 px-5 py-3 bg-[var(--bg)] border border-[var(--border)]
         rounded-xl text-muted text-sm no-underline transition-all duration-200
         hover:border-accent hover:text-white hover:-translate-y-0.5;
}
</style>
