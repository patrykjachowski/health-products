<template>
  <div class="container">
    <div class="p-4 sm:p-6 lg:p-8 font-sans">
      <header
        class="grid grid-cols-[3fr_1fr_1fr_1fr_auto] text-gray-500 gap-4 p-4 pb-1"
      >
        <span>Produkt</span>
        <span>Cena</span>
        <span>Ilość</span>
        <span>Suma</span>
        <span class="w-10 mr-4 p-2" />
      </header>

      <ul class="space-y-2 list-none">
        <ProductListItem
          name="GlowMe (malina)"
          :price="170.1"
          :amount="1"
          image="/healthlabs/Zn6gOx5LeNNTwn7v_img_GlowMe-ananas_listing.png"
        />
        <ProductListItem
          name="NewMe"
          :price="152.1"
          :amount="1"
          image="/healthlabs/ZmIaQ5m069VX1iAE_img_New_Me_Pro-Age.png"
        />
      </ul>
    </div>
  </div>
</template>
