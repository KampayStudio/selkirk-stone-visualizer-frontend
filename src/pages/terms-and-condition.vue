<template>
  <div
    class="auth-wrapper d-flex align-center justify-center"
    style="block-size: 100vh;"
  >
    <div class="position-relative">
      <VCard
        class="auth-card pa-3 text-center overflow-auto"
        max-width="90vh"
        max-height="80vh"
      >
        <VCardTitle class="justify-start">
          <h3>Terms and Condition</h3>
        </VCardTitle>
        <VCardItem
          class="text-sm mx-auto bg-gray-600 text-left"
          style=" background-color: #fff; inline-size: 90%; overflow-y: scroll;"
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
      <VRow>
        <VCol
          cols="12"
          class="d-flex "
        >
          <VBtn
            class="ms-auto mt-3"
            @click="$router.go(-1)"
          >
            Back
          </VBtn>
        </VCol>
      </VRow>
    </div>
  </div>
</template>

<style lang="scss">
.faq-v-window {
  .v-window__container {
    z-index: 0;
  }
}

.contact-card-avatar {
  border-radius: 8px;
}

li{
  list-style-type: circle;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
