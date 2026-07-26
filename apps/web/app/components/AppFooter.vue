<script setup lang="ts">
const email = ref('')
const sent = ref(false)

function subscribe() {
  if (!email.value.trim()) return
  sent.value = true
  email.value = ''
}
</script>

<template>
  <footer class="footer">
    <div class="footer__trust">
      <div class="container footer__trust-grid">
        <div class="trust">
          <span class="trust__icon" aria-hidden="true">✦</span>
          <div>
            <h3>Натуральные материалы</h3>
            <p>Используем только природные компоненты высшего качества.</p>
          </div>
        </div>
        <div class="trust">
          <span class="trust__icon" aria-hidden="true">◎</span>
          <div>
            <h3>Ручная работа</h3>
            <p>Каждая свеча отлита вручную с вниманием к деталям.</p>
          </div>
        </div>
        <div class="trust">
          <span class="trust__icon" aria-hidden="true">❀</span>
          <div>
            <h3>Экологичное производство</h3>
            <p>Минимум отходов и забота о природе на каждом этапе.</p>
          </div>
        </div>
        <div class="trust">
          <span class="trust__icon" aria-hidden="true">❐</span>
          <div>
            <h3>Подарочная упаковка</h3>
            <p>Каждая свеча упакована с любовью и готова к подарку.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__main">
      <div class="container footer__grid">
        <section>
          <h2 class="footer__title">Будьте в моменте</h2>
          <p class="muted">
            Подпишитесь и первыми узнавайте о новинках, лимитированных коллекциях и специальных
            предложениях.
          </p>
          <form class="footer__form" @submit.prevent="subscribe">
            <input v-model="email" type="email" placeholder="Ваш e-mail" required />
            <button class="btn" type="submit" aria-label="Подписаться">→</button>
          </form>
          <p v-if="sent" class="footer__note">Спасибо! Мы скоро напишем.</p>
        </section>

        <section>
          <h3 class="footer__heading">Коллекции</h3>
          <ul class="footer__links">
            <li><NuxtLink to="/product/hvoinyi-les">Хвойный лес</NuxtLink></li>
            <li><NuxtLink to="/product/tsvetushchii-lug">Цветущий луг</NuxtLink></li>
            <li><NuxtLink to="/materials">Материалы</NuxtLink></li>
            <li><NuxtLink to="/collection">Смотреть все</NuxtLink></li>
          </ul>
        </section>

        <section>
          <h3 class="footer__heading">О нас</h3>
          <ul class="footer__links">
            <li><NuxtLink to="/about">Наша история</NuxtLink></li>
            <li><NuxtLink to="/materials">Производство</NuxtLink></li>
            <li><NuxtLink to="/reviews">Отзывы</NuxtLink></li>
          </ul>
        </section>

        <section>
          <h3 class="footer__heading">Помощь</h3>
          <ul class="footer__links">
            <li><NuxtLink to="/contacts">Доставка и оплата</NuxtLink></li>
            <li><NuxtLink to="/contacts">Возврат и обмен</NuxtLink></li>
            <li><NuxtLink to="/contacts">Вопросы и ответы</NuxtLink></li>
          </ul>
        </section>

        <section class="footer__brand-block">
          <div class="footer__monogram" aria-hidden="true">M</div>
          <div class="footer__social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Telegram">TG</a>
            <a href="#" aria-label="Pinterest">PR</a>
          </div>
        </section>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <span>© Mgnovenie, 2026</span>
        <div class="footer__legal">
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Публичная оферта</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
}

.footer__trust {
  padding: 2.5rem 0;
  color: var(--color-text-on-cream);
  background: var(--color-cream);
}

.footer__trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.trust {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.trust__icon {
  margin-top: 0.2rem;
  opacity: 0.55;
}

.trust h3 {
  margin-bottom: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.trust p {
  font-size: 0.82rem;
  color: rgba(42, 37, 31, 0.65);
}

.footer__main {
  padding: 3.5rem 0 2.5rem;
  background: var(--color-ink-soft);
  border-top: 1px solid var(--color-border);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr 0.7fr;
  gap: 2rem;
}

.footer__title {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.footer__heading {
  margin-bottom: 1rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.footer__links {
  display: grid;
  gap: 0.55rem;
}

.footer__links a {
  color: var(--color-text-muted);
  transition: color var(--dur-fast) var(--ease-out);
}

.footer__links a:hover {
  color: var(--color-text);
}

.footer__form {
  display: flex;
  gap: 0.5rem;
  max-width: 22rem;
  margin-top: 1.25rem;
}

.footer__form input {
  flex: 1;
  min-height: 2.75rem;
  padding: 0 0.9rem;
  outline: none;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--color-border-strong);
}

.footer__form .btn {
  min-width: 2.75rem;
  padding: 0;
}

.footer__note {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.footer__brand-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.footer__monogram {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  font-family: var(--font-display);
  font-size: 1.4rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 50%;
}

.footer__social {
  display: flex;
  gap: 0.85rem;
  font-size: 0.7rem;
  color: var(--color-text-subtle);
  letter-spacing: 0.12em;
}

.footer__bottom {
  padding: 1rem 0;
  background: var(--color-ink);
  border-top: 1px solid var(--color-border);
}

.footer__bottom-inner {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-subtle);
}

.footer__legal {
  display: flex;
  gap: 1.25rem;
}

@media (max-width: 960px) {
  .footer__trust-grid,
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer__brand-block {
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .footer__trust-grid,
  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__bottom-inner {
    flex-direction: column;
  }
}
</style>
