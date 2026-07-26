<script setup lang="ts">
const cart = useCartStore()
const router = useRouter()

const form = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  comment: '',
})

const submitting = ref(false)
const errorMessage = ref('')
const successId = ref('')

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

async function submit() {
  errorMessage.value = ''
  if (!cart.items.length) {
    errorMessage.value = 'Корзина пуста'
    return
  }

  submitting.value = true
  try {
    const order = await $fetch<{ id: string }>('/api/orders', {
      method: 'POST',
      body: {
        customer: { ...form },
        items: cart.items.map((item) => ({
          productId: item.productId,
          slug: item.slug,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    })
    successId.value = order.id
    cart.clear()
  } catch (error: unknown) {
    errorMessage.value = 'Не удалось оформить заказ. Попробуйте ещё раз.'
    console.error(error)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  cart.hydrate()
  if (!cart.items.length && !successId.value) {
    router.replace('/collection')
  }
})
</script>

<template>
  <div class="checkout page">
    <div class="container">
      <h1>Оформление заказа</h1>

      <div v-if="successId" class="success">
        <h2>Заказ принят</h2>
        <p class="muted">Номер заказа: {{ successId }}</p>
        <p class="muted">Мы свяжемся с вами для подтверждения. Онлайн-оплата через Т‑Банк появится на следующем этапе.</p>
        <NuxtLink to="/collection" class="btn">Вернуться в коллекцию</NuxtLink>
      </div>

      <form v-else class="checkout__layout" @submit.prevent="submit">
        <div class="fields">
          <label>
            Имя
            <input v-model="form.name" required />
          </label>
          <label>
            Телефон
            <input v-model="form.phone" type="tel" required />
          </label>
          <label>
            Email
            <input v-model="form.email" type="email" required />
          </label>
          <label>
            Адрес доставки
            <textarea v-model="form.address" rows="3" required />
          </label>
          <label>
            Комментарий
            <textarea v-model="form.comment" rows="3" />
          </label>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <button class="btn" type="submit" :disabled="submitting">
            {{ submitting ? 'Отправка…' : 'Оформить заказ' }}
          </button>
        </div>

        <aside class="summary">
          <h2>Ваш заказ</h2>
          <ul>
            <li v-for="item in cart.items" :key="item.productId">
              <span>{{ item.name }} × {{ item.quantity }}</span>
              <strong>{{ formatPrice(item.price * item.quantity) }}</strong>
            </li>
          </ul>
          <p class="summary__total">Итого: {{ formatPrice(cart.total) }}</p>
        </aside>
      </form>
    </div>
  </div>
</template>

<style scoped>
.checkout {
  padding: 2.5rem 0 4rem;
}

.checkout h1 {
  font-size: 2.4rem;
  margin-bottom: 1.75rem;
}

.checkout__layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: start;
}

.fields {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.4rem;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
}

input,
textarea {
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--color-border);
  background: rgba(233, 226, 214, 0.03);
  outline: none;
}

.summary {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-panel);
}

.summary ul {
  display: grid;
  gap: 0.75rem;
  margin: 1rem 0;
}

.summary li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-text-muted);
}

.summary__total {
  font-size: 1.2rem;
}

.success {
  display: grid;
  gap: 1rem;
  max-width: 34rem;
}

.error {
  color: var(--color-danger);
}

@media (max-width: 800px) {
  .checkout__layout {
    grid-template-columns: 1fr;
  }
}
</style>
