<script setup lang="ts">
import Swal from 'sweetalert2'
import { VForm } from 'vuetify/components/VForm'
import axios from '@axios'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { confirmedValidator, emailValidator, lengthValidator, passwordValidator, requiredValidator } from '@validators'

const route = useRoute()
const router = useRouter()
const isDialogVisible = ref(false)
const isLoading = ref(false)

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirm_password: '',
  contact_number: '',
  address: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)
async function signup() {
  isLoading.value = true
  try {
    const response = await axios.post('/users/register/',
      {
        first_name: form.value.firstname,
        last_name: form.value.lastname,
        email: form.value.email,
        password: form.value.password,
        contact_number: form.value.contact_number,
        address: form.value.address,
        is_admin: false,
        permissions: {
          is_administrator: false,
          is_content_managing: false,
          is_support: false,
          is_analytics: false,
          is_product_managing: false,
        },
      })

    Swal.fire({
      title: 'Successfully Signed Up!',
      text: 'We\'ve sent you an email. Please check and verify your account.',
      icon: 'success',
      confirmButtonColor: '#1A4E19',
      confirmButtonText: 'Go to Login Page',
    }).then(result => {
      if (result.isConfirmed)
        router.replace(route.query.to ? String(route.query.to) : '/login')
    })
    isLoading.value = false

    // router.replace(route.query.to ? String(route.query.to) : '/login')
  }
  catch (error) {
    Swal.fire({
      title: `${Object.keys(error.response.data)[0].replace(/[^A-Za-z0-9]+/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}: ${Object.values(error.response.data)[0]}`,
      icon: 'error',
    })
    console.error('Signup error:', Object.values(error.response.data)[0])
    isLoading.value = false
  }
}

const section_content = ref({
  logo: '',
  banner: '',
  heading_1: '',
  heading_2: '',
  body: '',
})

const get_content = async () => {
  try {
    const response = await axios.get('/contents/signup_page/')

    section_content.value = response.data[0]
  }
  catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  get_content()
})
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="4"
      class="d-none d-md-flex"
    >
      <!-- illustration -->
      <div class="position-relative w-100">
        <div

          class="d-flex align-center justify-center"
          style=" background-size: cover; block-size: 100vh;"
          :style="{ backgroundImage: `url(${section_content.banner})` }"
        >
          <!-- <VImg :src="backdrop" /> -->
        </div>
      </div>
    </VCol>

    <VCol
      cols="12"
      md="8"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="900"
        class="mt-12 mt-sm-0 pa-6"
        style="inline-size: 800px;"
      >
        <VCardItem class="justify-start">
          <template #prepend>
            <RouterLink to="/">
              <div class="d-flex">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
              </div>
            </RouterLink>
          </template>

          <VCardTitle class="auth-title">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <h6 class="text-h4 mb-1">
            {{ section_content.heading_1 }}
          </h6>
          <p class="mb-0">
            <span>{{ section_content.body }}</span>
            <RouterLink
              class="text-primary ms-2"
              :to="{ name: 'login' }"
            >
              Sign in
            </RouterLink>
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="signup">
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.email"
                      type="email"
                      autofocus
                      label="Email"
                      :rules="[requiredValidator, emailValidator]"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.contact_number"
                      autofocus
                      label="Contact Number"
                      required
                      :rules="[requiredValidator, lengthValidator(form.contact_number, 8)]"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.firstname"
                      autofocus
                      label="First Name"
                      :rules="[requiredValidator, lengthValidator(form.contact_number, 2)]"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.lastname"
                      autofocus
                      label="Last Name"
                      :rules="[requiredValidator, lengthValidator(form.contact_number, 2)]"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="form.address"
                      autofocus
                      label="Address"
                      :rules="[requiredValidator, lengthValidator(form.contact_number, 8)]"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.password"
                      label="Password"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                      :rules="[requiredValidator, passwordValidator]"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="form.confirm_password"
                      label="Confirm Password"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                      :rules="[requiredValidator, confirmedValidator(form.confirm_password, form.password)]"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </VCol>
                </VRow>

                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="form.privacyPolicies"
                    inline
                    :rules="[requiredValidator]"
                  />
                  <VLabel style="opacity: 1;">
                    <VDialog
                      v-model="isDialogVisible"
                      width="500"
                    >
                      <!-- Activator -->
                      <template #activator="{ props }">
                        I agree to &nbsp;
                        <span
                          v-bind="props"
                          class="text-primary"
                        >
                          TERMS AND CONDITIONS
                        </span>
                      </template>

                      <!-- Dialog Content -->
                      <VCard title="Terms and Condition">
                        <DialogCloseBtn
                          variant="text"
                          size="small"
                          @click="isDialogVisible = false"
                        />

                        <VCardItem
                          class="text-sm mx-auto bg-gray-600 text-left"
                          style=" background-color: #fff; inline-size: 90%;"
                        >
                          <h2>
                            Welcome to Selkirk Stone Visualizer!
                          </h2>
                          <br>
                          <p>
                            Before you continue with your account creation, we would like to inform you about the types of data we collect, how we use this data, and your rights regarding your personal information.
                            Data Collection
                          </p>
                          <h4>
                            By signing up for our services, you agree to our collection of the following data:
                          </h4>
                          <ol>
                            <li>Demographic Information: This includes name and other demographic details that help us tailor our services to suit your needs better.</li>
                            <li>Device Information: We collect information about the devices you use to access our services, including the type of device, operating system, and device settings.</li>
                            <li>Images Used in Visualizer App: Any images you upload or use within our Visualizer App will be collected for service enhancement.</li>
                            <li>Device Browser Information: We gather data on the web browser you use to access our services for optimizing our platform compatibility.</li>
                            <li>IP Address: Your IP address is collected to help diagnose problems with our server, administer our website, and provide more personalized services.</li>
                            <li>Location Data: We collect your geographical location data to provide location-specific services and recommendations.</li>
                            <li>Email Address: Your email address is collected for account verification, communication purposes, and to send updates or information about our services.</li>
                          </ol>
                          <br>
                          <h3>Use of Collected Data</h3>
                          <br>
                          <h4>The data we collect is primarily used for the following purposes:</h4>
                          <ul>
                            <li>Analytics: To understand how our services are used and to make improvements.</li>
                            <li>Tracking: To offer personalized content and advertising based on your interests and usage patterns.</li>
                          </ul>
                          <br>
                          <h4>Your Rights and Choices</h4>
                          <p>
                            You have certain rights regarding the personal information we hold about you. These include the right to access your data, correct any inaccuracies, and, in some cases, request the deletion of your personal data. You also have the right to withdraw your consent to our use of your data at any time.
                            Consent
                          </p>
                          <p>
                            By creating an account, you consent to our collection and use of your data as outlined in these terms and conditions. We are committed to protecting your privacy and ensuring the security of your personal information.
                            Please read these terms carefully. If you have any questions or concerns about our data practices, please contact us at [Your Contact Information].
                          </p>
                        </VCardItem>
                      </VCard>
                    </VDialog>
                  </VLabel>
                </div>
                <VRow class="d-flex justify-content-end">
                  <VCol
                    cols="12"
                    md="2"
                    class="ms-auto"
                  >
                    <VBtn type="submit">
                      <div v-show="!isLoading">
                        Sign up
                      </div>
                      <VProgressCircular
                        v-show="isLoading"
                        indeterminate
                        color="white"
                      />
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";

#backdrop{
  background-image: url('https://images.pexels.com/photos/7031403/pexels-photo-7031403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
