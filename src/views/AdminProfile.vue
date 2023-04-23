<template>
  <ToastError v-if="hasError" :code="errorCode"></ToastError>
  <BaseModal :show="changePassword" @close="changePassword = false">
    <div class="font-baseFamily w-full">
      <header class="w-full">
        <h1 class="font-bold w-ful text-center text-2xl uppercase">
          Change Password
        </h1>
      </header>
      <form
        @submit.prevent="
          updatePassword({
            old_password: old_password,
            new_password: new_password,
          })
        "
        class="p-9 w-full min-h-[400px] flex gap-9 flex-col items-center justify-center"
        id="password"
      >
        <div class="w-full">
          <p class="w-full">Current Password</p>
          <input
            v-model="old_password"
            type="password"
            aria-autocomplete="both"
            required
            autocomplete="current password"
            class="p-1 h-[4rem] focus:outline-none focus:border-2 focus:border-b-green-300 border-2 w-full border-[#75777A] rounded-lg"
          />
        </div>
        <div class="w-full">
          <p class="w-full">New Password</p>
          <input
            v-model="new_password"
            type="password"
            aria-autocomplete="both"
            autocomplete="password"
            required
            class="p-1 h-[4rem] focus:outline-none focus:border-2 focus:border-b-green-300 border-2 w-full border-[#75777A] rounded-lg"
          />
        </div>
        <div class="w-full flex">
          <button
            type="submit"
            class="bg-black uppercase dark:bg-white/60 w-4/5 mx-auto h-[3rem] text-white dark:text-black font-bold rounded-md"
          >
            Confirm
          </button>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <BaseIcon name="powered" class="text-black w-[150px]" />
        </div>
      </form>
    </div>
  </BaseModal>
  <header class="md:flex justify-start shadow-md py-3 w-full px-12">
    <div class="flex md:w-full gap-9 items-center justify-between">
      <span class="lg:hidden"> &nbsp; </span>
      <div class="flex justify-start m-0">
        <AppLogo class="text-black dark:text-white" />
      </div>
      <button class="lg:hidden" @click="toggleMenu">
        <BaseIcon name="hamburger" v-if="!menuOpen" />
        <BaseIcon name="close" v-if="menuOpen" />
      </button>
      <div class="hidden lg:block" id="search" z-50>
        <form
          @submit.prevent="searchMini(word)"
          class="flex md:gap-4 gap-0 items-center rounded-lg w-2/5 md:w-full mx-auto bg-gray-100 px-6 py-1"
        >
          <BaseIcon name="search" class="text-gray-800" />
          <input
            type="text"
            placeholder="search posts"
            class="outline-none w-full bg-gray-100"
            v-model="word"
          />
        </form>
        <a
          @click="results = null"
          class="shadow mx-auto h-[100vh] w-full z-50 bg-transparent absolute transition-all"
          v-show="results"
        >
          <div class="h-min bg-white">
            <div class="" v-for="res in results" :key="res.slug">
              <a :href="`/post/${res.slug}`">
                <p class="p-3">{{ res.title }}</p>
              </a>
              <hr class="w-full" />
            </div>
          </div>
        </a>
      </div>
    </div>
  </header>
  <aside
    v-if="menuOpen"
    class="flex absolute bg-white dark:bg-[#272626] mt-[3rem] h-full overflow-scroll z-50 items-center text-left flex-col space-y-10 w-full capitalize border-t border-black dark:border-white top-0"
  >
    <div class="w-4/5 mt-9">
      <div class="w-4/5 flex pb-6 gap-6">
        <figure class="w-[70px] h-[70px] min-w-[70px]">
          <img
            v-if="user.profileImage"
            :src="user.profileImage"
            alt=""
            class="rounded-full object-cover w-full h-full"
          />
          <img v-else src="@/assets/icons/Ellipse.png" alt="" />
        </figure>
        <div class="flex flex-col justify-center items-start font-baseFamily">
          <p class="text-2xl mb-2">{{ user.name }}</p>
          <p class="text-base font-semibold text-zinc-700">{{ user.role }}</p>
        </div>
      </div>
      <hr class="w-full border" />
    </div>
    <div
      class="flex text-xl flex-col justify-center font-baseFamily gap-10 w-4/5 pt-5 !m-0"
      id="dropMenu"
    >
      <a
        @click="goToPage(1)"
        class="w-max flex gap-3 items-center cursor-pointer"
        :class="{
          ' text-blue-600 decoration-4': pages === 1,
        }"
      >
        <BaseIcon name="user" class="" />
        <p>Profile</p>
      </a>
      <a
        v-if="user.isSuper"
        href="https://analytics.google.com/analytics/web/?authuser=1"
        class="w-max text-[#E37400] flex cursor-pointer gap-3 items-center"
      >
        <BaseIcon name="chart_line" class="" />
        <p>Analytics</p>
      </a>
      <a
        @click="goToPage(4)"
        class="cursor-pointer w-max flex gap-3 items-center"
        :class="{
          ' text-blue-600 decoration-4': pages === 4,
        }"
      >
        <BaseIcon name="plusButton" class="" />
        <p>Create new article</p>
      </a>
      <button
        @click="goToPage(6)"
        class="cursor-pointer w-max flex gap-3 items-center"
        :class="{
          ' text-blue-600 decoration-4': pages === 6,
        }"
      >
        <BaseIcon name="video" class="" />
        <p>Create Video Post</p>
      </button>
      <a
        @click="goToPage(2)"
        class="w-max flex gap-3 items-center cursor-pointer"
        :class="{
          ' text-blue-600 decoration-4': pages === 2,
        }"
      >
        <BaseIcon name="articles" class="" />
        <p>Your articles</p>
      </a>
      <a
        @click="goToPage(3)"
        class="w-max flex cursor-pointer gap-3 items-center"
        :class="{
          ' text-blue-600 decoration-4': pages === 3,
        }"
      >
        <BaseIcon name="Vector-1" class="" />
        <p>Drafts</p>
      </a>
      <button
        class="w-max flex cursor-pointer gap-3 items-center"
        @click="showPriceIndexModal = true"
        v-if="user.isSuper"
      >
        <BaseIcon name="chart_line" />
        <p>Price Index</p>
      </button>
      <a
        v-if="user.isSuper"
        @click="goToPage(5)"
        class="w-max flex cursor-pointer gap-3 items-center"
        :class="{
          ' text-blue-600 decoration-4': pages === 5,
        }"
      >
        <BaseIcon name="Vector-1" class="" />
        <p>Review</p>
      </a>
      <button class="w-max flex gap-3 items-center" @click="toggleDark()">
        <BaseIcon name="mode" class="stroke-black dark:stroke-white" />
        <p>Dark Mode</p>
      </button>
      <button
        @click="logout()"
        class="w-max flex gap-3 items-center cursor-pointer"
      >
        <BaseIcon name="logOut" class="" />
        <p>Log out</p>
      </button>
      <hr class="w-full border" />
      <RouterLink
        to="/"
        class="font-semibold text-base"
        exact-active-class="text-[#366bff]"
      >
        home
      </RouterLink>
      <RouterLink
        to="/bc"
        class="font-semibold text-base"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
        >blockchain report
      </RouterLink>
      <RouterLink
        to="/eq"
        class="font-semibold text-base"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
      >
        equity report</RouterLink
      >
      <RouterLink
        to="/eco"
        class="font-semibold text-base"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
      >
        economics report</RouterLink
      >
      <RouterLink
        to="/geo"
        class="font-semibold text-base"
        active-class="text-[#366bff]"
        exact-active-class="text-[#366bff]"
      >
        geopolitical report</RouterLink
      >
    </div>
  </aside>
  <div class="pb-6 pt-2 lg:hidden" id="search" z-50>
    <form
      @submit.prevent="searchMini(word)"
      class="flex md:gap-4 gap-0 items-center rounded-lg w-2/5 mx-auto bg-gray-100 px-6 py-1"
    >
      <BaseIcon name="search" class="text-gray-800" />
      <input
        type="text"
        required
        placeholder="search posts"
        class="outline-none w-full bg-gray-100"
        v-model="word"
      />
      <!-- <button
        @click="searchMini(word)"
        class="bg-blue-600 uppercase text-white p-2 font-bold"
      >
        Search
      </button> -->
    </form>
    <a
      @click="results = null"
      class="shadow mx-auto h-[100vh] w-full z-50 bg-transparent absolute transition-all"
      v-show="results"
    >
      <div class="h-min bg-white">
        <div class="" v-for="res in results" :key="res.slug">
          <a :href="`/post/${res.slug}`">
            <p class="p-3">{{ res.title }}</p>
          </a>
          <hr class="w-full" />
        </div>
      </div>
    </a>
  </div>

  <a
    @click="results = null"
    class="shadow mx-auto h-[100vh] w-full z-30 bg-transparent absolute transition-all"
    v-show="results"
  >
    <div class="w-2/5"></div>
  </a>
  <div class="lg:grid grid-cols-[1fr_3fr] font-baseFamily h-[100vh]">
    <div
      class="w-full hidden lg:flex dark:text-white items-center flex-col bg-gray-100 dark:bg-[#1b1b1f]"
      id="sidebar"
    >
      <div class="w-4/5 mt-9">
        <div class="w-4/5 flex pb-6 gap-6">
          <figure class="w-[70px]">
            <div class="w-[70px]">
              <img
                v-if="user.profileImage"
                :src="user.profileImage"
                alt=""
                class="rounded-full w-[70px] h-[70px] object-cover"
              />
              <img v-else src="@/assets/icons/Ellipse.png" alt="" />
            </div>
          </figure>
          <div class="font-baseFamily flex flex-col justify-center items-start">
            <p class="text-2xl">{{ user.name }}</p>
            <p class="text-base text-gray-400">
              {{ role }}
            </p>
          </div>
        </div>
        <hr class="w-full border" />
      </div>
      <div
        class="text-base 2xl:text-xl flex flex-col justify-center gap-10 w-4/5 pt-5 !m-0"
      >
        <a
          @click="goToPage(1)"
          class="hover:cursor-pointer w-max flex gap-3 items-center"
          :class="{
            ' text-blue-600 decoration-4': pages === 1,
          }"
        >
          <BaseIcon name="user" class="" />
          <p>Profile</p>
        </a>
        <a
          v-if="user.isSuper"
          href="https://analytics.google.com/analytics/web/?authuser=1"
          class="w-max flex text-[#E37400] hover:cursor-pointer gap-3 items-center"
        >
          <BaseIcon name="chart_line" class=" " />
          <p>Analytics</p>
        </a>
        <a
          @click="goToPage(4)"
          class="hover:cursor-pointer w-max flex gap-3 items-center"
          :class="{
            ' text-blue-600 decoration-4': pages === 4,
          }"
        >
          <BaseIcon name="plusButton" class="" />
          <p>Create new article</p>
        </a>
        <a
          @click="goToPage(6)"
          class="hover:cursor-pointer w-max flex gap-3 items-center"
          :class="{
            ' text-blue-600 decoration-4': pages === 6,
          }"
        >
          <BaseIcon name="video" class="" />
          <p>Create Video Post</p>
        </a>
        <a
          @click="goToPage(2)"
          class="w-max hover:cursor-pointer flex gap-3 items-center"
          :class="{
            ' text-blue-600 decoration-4': pages === 2,
          }"
        >
          <BaseIcon name="articles" class="" />
          <p>Your articles</p>
        </a>
        <a
          @click="goToPage(3)"
          class="w-max flex hover:cursor-pointer gap-3 items-center"
          :class="{
            ' text-blue-600 decoration-4': pages === 3,
          }"
        >
          <BaseIcon name="Vector-1" class="" />
          <p>Drafts</p>
        </a>
        <button
          class="w-max flex hover:cursor-pointer gap-3 items-center"
          v-if="user.isSuper"
          @click="showPriceIndexModal = true"
        >
          <BaseIcon name="chart_line" />
          <p>Price Index</p>
        </button>
        <a
          v-if="user.isSuper"
          @click="goToPage(5)"
          class="w-max flex hover:cursor-pointer gap-3 items-center"
          :class="{
            ' text-blue-600 decoration-4': pages === 5,
          }"
        >
          <BaseIcon name="Vector-1" class="" />
          <p>Review</p>
        </a>
        <button class="w-max flex gap-3 items-center" @click="toggleDark()">
          <BaseIcon name="mode" class="stroke-black dark:stroke-white" />
          <p>Dark Mode</p>
        </button>
        <button
          @click="logout()"
          class="w-max flex gap-3 hover:cursor-pointer items-center"
        >
          <BaseIcon name="logOut" class="" />

          <p>Log out</p>
        </button>
        <hr class="w-full border" />
        <RouterLink
          to="/"
          class="font-semibold text-base"
          exact-active-class="text-[#366bff]"
        >
          home
        </RouterLink>
        <RouterLink
          to="/bc"
          class="font-semibold text-base"
          active-class="text-[#366bff]"
          exact-active-class="text-[#366bff]"
          >blockchain report
        </RouterLink>
        <RouterLink
          to="/eq"
          class="font-semibold text-base"
          active-class="text-[#366bff]"
          exact-active-class="text-[#366bff]"
        >
          equity report</RouterLink
        >
        <RouterLink
          to="/eco"
          class="font-semibold text-base"
          active-class="text-[#366bff]"
          exact-active-class="text-[#366bff]"
        >
          economics report</RouterLink
        >
        <RouterLink
          to="/geo"
          class="font-semibold text-base"
          active-class="text-[#366bff]"
          exact-active-class="text-[#366bff]"
        >
          geopolitical report</RouterLink
        >
      </div>
    </div>
    <div class="w-full">
      <section class="pt-2 px-5 w-full mx-auto" v-if="pages == 1" id="profile">
        <!-- <button class="bg-white p-3" @click="showGroups()"></button> -->

        <p class="text-xl md:text-3xl md:font-medium font-bold p-5 mb-9">
          Profile
        </p>
        <div class="lg:w-4/5 mx-auto">
          <div
            class="flex flex-col lg:flex-row gap-4 mb-9 relative items-center"
          >
            <figure class="w-[150px]">
              <div
                class="before:content-[url(@/assets/icons/svgs/admin/remix-icons/Vector.png)] w-[150px] before:flex before:justify-center before:items-center before:w-[150px] before:h-[150px] before:rounded-full before:backdrop-brightness-50 before:absolute z-50"
              >
                <img
                  v-if="proFile"
                  :src="proFile"
                  alt=""
                  class="object-cover rounded-full h-[150px] w-[150px]"
                />
                <img
                  v-else
                  :src="user.profileImage"
                  alt=""
                  class="rounded-full object-cover h-[150px] w-[150px]"
                />
              </div>
              <input
                type="file"
                @change="changeProfileImage"
                required
                :style="`background:url(${user.profileImage})`"
                class="w-[150px] opacity-0 absolute top-0 rounded-full h-[150px] bg-center bg-contain border-black bg-gray-100 item-center justify-center cursor-pointer"
                accept="image/*"
              />
            </figure>
            <div class="flex flex-col gap-2 text-center md:text-left">
              <p class="font-bold text-3xl">{{ user.name }}</p>
              <p
                class="bg-gray-100 px-4 w-max py-1 dark:text-black text-xs rounded-md mx-auto md:mx-0 my-4"
              >
                {{ user.posts.length }}
                Articles Written
              </p>
              <div class="flex justify-center items-center">
                <p
                  v-if="user.bio"
                  class="md:text-left text-[#47464A] dark:text-white text-sm w-full"
                >
                  {{ user.bio }}
                </p>
                <p v-else>No Bio</p>
              </div>
            </div>
          </div>
          <div class="">
            <p class="pb-9 font-bold text-xl md:text-2xl md:font-medium">
              Edit Profile
            </p>
            <div class="pb-9" id="userName">
              <p class="font-bold">Name</p>
              <input
                v-model="user.name"
                type="text"
                class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 w-full border-b border-b-black dark:border-b-white"
              />
            </div>
            <div class="pb-9" id="userName">
              <p class="font-bold">Role</p>
              <input
                v-model="role"
                type="text"
                class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 w-full border-b border-b-black dark:border-b-white"
              />
              <select
                v-model="user.role"
                class="h-[2.5rem] bg-gray-100 hidden p-1 focus:outline-none focus:border-4 focus:border-b-green-300 border-2 w-full border-b-black dark:border-b-white"
              >
                <option :value="role">{{ role }}</option>
                <option value="1">Editor</option>
                <option value="2">Writer</option>
                <option value="3">Head of Content</option>
                <option value="4">Team Lead</option>
              </select>
            </div>
            <div class="pb-9" id="bio">
              <p class="font-bold">Bio</p>
              <textarea
                cols="30"
                v-model="user.bio"
                rows="5"
                class="bg-gray-100 dark:bg-transparent p-1 text-sm text-[#47464A] dark:text-white focus:outline-none focus:border-b-green-300 w-full border-b border-b-black dark:border-b-white"
              ></textarea>
            </div>

            <button
              @click="UpdateProfile"
              class="bg-black dark:bg-white/60 w-11/12 mx-auto h-[3rem] text-white text-base dark:text-black rounded-[10px] md:w-fit md:mx-0 px-10 block"
            >
              Save
            </button>
            <hr class="my-6" />

            <div class="pb-3 flex justify-center">
              <button
                @click="changePassword = true"
                class="pb-3 px-3 cursor-pointer flex items-center dark:bg-white/60 dark:text-black dark:pt-3 gap-2 text-xl shadow-lg rounded-[10px]"
              >
                <BaseIcon name="lock" class="dark:text-black" />
                Change password
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="" v-if="pages == 2" id="articles">
        <div class="flex md:flex-row flex-col w-full" id="main-header">
          <p class="text-xl font-bold p-5">Your Articles</p>
          <nav
            class="flex flex-row gap-4 p-5 dark:border-white overflow-y-auto scrollbar-hide"
          >
            <button
              @click="showPost('equity')"
              :class="{
                'underline underline-offset-[10px] text-blue-600 decoration-4':
                  et,
              }"
            >
              Equity
            </button>
            <button
              @click="showPost('blockchain')"
              :class="{
                'underline underline-offset-[10px] text-blue-600 decoration-4':
                  bc,
              }"
            >
              Blockchain
            </button>
            <button
              @click="showPost('geopolitics')"
              :class="{
                'underline underline-offset-[10px] text-blue-600 decoration-4':
                  ge,
              }"
            >
              Geopolitical
            </button>
            <button
              @click="showPost('economic')"
              :class="{
                'underline underline-offset-[10px] text-blue-600 decoration-4':
                  ec,
              }"
            >
              Economics
            </button>
          </nav>
        </div>
        <main
          class="dark:bg-inherit bg-gray-100 lg:bg-white p-5 flex flex-col mt-10 gap-10"
        >
          <template v-if="posts && posts.length > 0">
            <div
              v-for="post in posts"
              :key="post.slug"
              class="flex flex-col gap-4 bg-white rounded-xl p-5 mb-6 items-end lg:items-start lg:flex-row-reverse"
            >
              <div
                v-if="post.mainImage"
                class="sm:h-[12rem] h-[8rem] lg:h-60 lg:max-h-56 w-full lg:w-[50%]"
              >
                <img
                  :src="post.mainImage"
                  alt="blog post"
                  class="lg:w-4/5 w-full rounded-lg h-full object-cover"
                />
              </div>
              <div class="lg:w-[50%] w-full">
                <div class="mb-5">
                  <h3 class="font-semibold text-black capitalize leading-5">
                    {{ post.title }}
                  </h3>
                  <h3 class="text-gray-500 text-[11px] mt-2 mb-3 leading-5">
                    {{ formatDate(post.publishedAt) }}
                  </h3>
                  <p class="text-sm text-black leading-4">
                    {{ post.summary }}
                  </p>
                </div>
                <div class="grid grid-cols-2 gap-4 w-4/5 text-sm">
                  <RouterLink
                    class="text-center block h-full bg-black rounded-md text-white p-3"
                    :to="{
                      name: 'post',
                      params: { slug: post.slug },
                    }"
                  >
                    Read More
                  </RouterLink>
                  <button
                    @click="deletePost({ slug: post.slug })"
                    class="block bg-white border-red-600 border-2 rounded-md text-red-600 p-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </template>
          <div class="w-full flex justify-center items-center h-[50vh]" v-else>
            <h1 class="font-bold text-black text-2xl">No Posts</h1>
          </div>
        </main>
      </section>
      <section class="" v-if="pages == 3" id="drafts">
        <p class="text-xl font-bold p-5">Drafts</p>
        <div class="bg-gray-100 p-5">
          <div
            v-for="(post, index) in drafts"
            :key="index"
            class="flex flex-col lg:flex-row bg-white rounded-xl p-5 mb-6 gap-4 lg:h-[20vh] items-end lg:flex-row-reverse"
          >
            <div
              v-if="post.mainImage"
              class="sm:h-[12rem] h-[8rem] lg:h-full w-full lg:w-[50%]"
            >
              <img
                :src="post.mainImage"
                alt="blog post"
                class="lg:w-4/5 w-full rounded-lg h-full object-cover"
              />
            </div>
            <div class="lg:w-[50%] w-full">
              <div class="mb-5">
                <h3 class="font-bold font-baseFamily uppercase leading-5">
                  {{ post.title }}
                </h3>
                <h3
                  class="font-serifFamily text-gray-500 text-[11px] mb-3 leading-5"
                >
                  {{
                    new Date(post.publishedAt)
                      .toString()
                      .replace("GMT+0100 (West Africa Standard Time)", " ")
                      .trim()
                  }}
                </h3>
                <p class="text-xs leading-4">
                  {{ post.summary }}
                </p>
              </div>
              <div class="grid grid-cols-2 hidden gap-4 w-4/5">
                <button class="bg-black rounded-md text-white px-3 py-1">
                  Post
                </button>
                <button
                  class="bg-white rounded-md border border-black px-3 py-1"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="w-full flex justify-center items-center h-[50vh]" v-else>
            <h1 class="font-bold text-black text-2xl">No Drafts</h1>
          </div> -->
        </div>
      </section>
      <section class="" v-if="pages == 5" id="review">
        <p class="text-xl font-bold p-5">Pending Posts</p>
        <div class="dark:bg-transparent p-5">
          <div
            v-for="post in reviewPosts"
            v-if="reviewPosts.length > 0"
            checked=" &checkmark;"
            unchecked=" &excl;"
            :class="{
              approved: post.review === `Approved`,
              disapproved:
                post.review === `InReview` || post.review === `Rejected`,
            }"
            :key="post.slug"
            class="flex flex-col relative lg:flex-row bg-white shadow-md rounded-xl p-5 mb-6 gap-6 items-end lg:flex-row-reverse"
          >
            <div
              v-if="post.mainImage"
              class="sm:h-[12rem] h-[8rem] lg:h-full w-full lg:w-[50%]"
            >
              <img
                :src="post.mainImage"
                alt="blog post"
                class="lg:w-4/5 w-full rounded-lg h-full object-cover"
              />
            </div>
            <div class="lg:w-[50%] w-full">
              <div class="">
                <div class="">
                  <h3
                    class="font-bold flex flex-col w-max text-black font-baseFamily uppercase leading-5"
                  >
                    {{ post.title }}
                    <span
                      ><p class="capitalize text-sm text-black/40">
                        by {{ post.author }}
                      </p></span
                    >
                  </h3>
                </div>
                <div class="flex w-full justify-between my-2 items-center">
                  <h3 class="text-black font-bold text-xs leading-5">
                    {{
                      new Date(post.publishedAt)
                        .toString()
                        .replace("GMT+0100 (West Africa Standard Time)", " ")
                        .trim()
                    }}
                  </h3>
                  <h3
                    class="bg-stone-600 font-bold p-2 text-md text-white h-min"
                  >
                    {{ post.review }}
                  </h3>
                </div>
                <div class="mt-5">
                  <a
                    :href="`/post/${post.slug}`"
                    class="font-baseFamily bg-black text-white p-2 font-bold text-sm leading-5"
                  >
                    Go to preview &rangle;
                  </a>
                </div>
                <hr class="mb-3 border-0" />
                <p class="leading-4 text-black">
                  {{ post.summary }}
                </p>
              </div>
              <div class="flex mt-12 gap-4 w-4/5">
                <button
                  @click="
                    review({ id: post.id, slug: post.slug, review: `Approved` })
                  "
                  class="bg-white border-2 border-green-600 text-green-600 px-3 py-1"
                >
                  Approve
                </button>
                <button
                  @click="
                    review({ id: post.id, slug: post.slug, review: `Rejected` })
                  "
                  class="bg-white border-black border-2 text-black px-3 py-1"
                >
                  Reject
                </button>
                <button
                  @click="deletePost({ slug: post.slug })"
                  class="bg-white border-red-600 border-2 text-red-600 px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center items-center h-[50vh]" v-else>
            <h1 class="font-bold text-black text-2xl">No Drafts</h1>
          </div>
        </div>
      </section>
      <section class="px-5" v-if="pages == 4" id="createPosts">
        <p class="text-2xl md:text-3xl font-semibold md:font-bold py-5">
          Create article
        </p>
        <div class="flex flex-col gap-12">
          <div class="" id="title">
            <label for="title">Title*</label><br />
            <input
              type="text"
              name="title"
              v-model="title"
              class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
              id="title"
            />
          </div>
          <div class="" id="subtitle">
            <label for="subtitle">Sub Topic</label><br />
            <input
              type="text"
              name="title"
              v-model="subtitle"
              class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
              id="subtitle"
            />
          </div>
          <div class="" id="mainImage">
            <label for="article image">Main Image*</label>
            <figure
              class="w-full relative h-[12rem] overflow-hidden rounded-xl"
              id="article-image"
            >
              <div
                after="Drag and drop images here or select from your device"
                class="before:border-dashed before:border-2 before:border-gray-500 rounded-xl before:rounded-xl before:content-[url(@/assets/icons/svgs/admin/remix-icons/Vector.png)] after:content-[attr(after)] before:flex before:justify-center before:items-center before:w-full before:h-[12rem] before:backdrop-brightness-[.6] before:absolute z-50"
              >
                <img
                  v-if="file"
                  :src="image"
                  alt=""
                  class="object-cover w-full"
                />
                <div v-else class="w-full h-[12rem] orunded-xl"></div>
              </div>
              <input
                type="file"
                @change="Changeimage"
                required
                :style="`background:url(${file}) no-repeat`"
                class="w-full absolute opacity-0 top-0 h-full bg-center bg-contain bg-gray-100 item-center justify-center cursor-pointer"
                name="article image"
                accept="image/*"
              />
            </figure>
            <i class="font-[500] text-blue-400 text-xs"
              >recommended: images should be 1280px x 860px for best
              resolution</i
            >
          </div>
          <div class="" id="body">
            <label for="article image">Body*</label>
            <div class="-z-50">
              <ckeditor
                required
                id="editor"
                :editor="editor"
                v-model="editorData"
                :config="editorConfig"
              />
            </div>
          </div>
          <div class="" id="keyNotes">
            <label for="summary">Key Notes*</label>
            <textarea
              name="summary"
              id=""
              cols="30"
              rows="4"
              class="bg-gray-100 dark:bg-transparent p-1 focus:outline-none focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
              v-model="summary"
            ></textarea>
          </div>
          <div class="grid grid-rows-2 lg:gap-12 gap-6" id="metadata">
            <div class="border border-gray-400 rounded-lg capitalize">
              <p class="p-3 font-bold">Add to a Category*</p>
              <hr class="w-full border-gray-400" />
              <div class="lg:p-8 p-2 lg:text-md text-sm">
                <div
                  class="my-4"
                  v-for="choice in categorySel.autocompleteItems"
                  :key="choice.slug"
                >
                  <input
                    type="radio"
                    name="category"
                    :value="choice.slug"
                    id="category"
                    v-model="categorySel.selected"
                  />
                  <label for="category" class="lg:px-4 pl-2">{{
                    choice.cat_title
                  }}</label>
                </div>
              </div>
            </div>
            <div class="border border-gray-400 rounded-lg h-min">
              <div class="p-3">
                <p class="font-semibold">Get featured on the Home screen</p>
                <p class="lg:text-md text-sm">
                  Tag this post as <i>Editor's Pick</i> to get featured on the
                  home screen
                </p>
              </div>
              <hr class="border-gray-400 mt-5" />
              <div class="lg:p-8 p-4 flex gap-3">
                <label class="toggler-wrapper style-3">
                  <input type="checkbox" name="editor" v-model="editorpost" />
                  <div class="toggler-slider">
                    <div class="toggler-knob"></div>
                  </div>
                </label>
                <p class="font-bold">Feature on Home Screen</p>
              </div>
            </div>
          </div>
          <div
            class="w-full md:flex-row items-center flex flex-col gap-4 mb-6"
            id="buttons"
          >
            <div class="w-full md:w-auto flex justify-center">
              <button
                class="bg-white text-black border border-black rounded-lg md:rounded-sm p-3 w-full mx-auto"
                @click="savePost()"
              >
                Add To Draft
              </button>
            </div>
            <div class="w-full md:w-auto flex justify-center">
              <button
                class="bg-black dark:bg-white/60 text-white dark:text-black p-3 w-full rounded-lg md:rounded-sm mx-auto"
                @click="publishPost()"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </section>
      <PriceIndexModal
        :show="showPriceIndexModal"
        @close="showPriceIndexModal = false"
      />
      <section class="px-5" v-if="pages == 6" id="createVideoPosts">
        <p class="text-xl font-bold py-5">Create Video Headline</p>
        <div class="flex flex-col gap-12">
          <div class="" id="title">
            <label for="" class="font-bold">Title*</label><br />
            <input
              type="text"
              name="title"
              v-model="title"
              class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-4 focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
              id=""
            />
          </div>
          <div class="" id="subtitle">
            <label for="" class="font-bold">Sub Topic</label><br />
            <input
              type="text"
              name="title"
              v-model="subtitle"
              class="h-[2.5rem] bg-gray-100 p-1 focus:outline-none focus:border-4 focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
              id=""
            />
          </div>
          <div class="" id="mainImage">
            <label for="article image" class="font-bold">Thumbnail*</label>
            <figure class="w-full relative" id="article-image">
              <div
                after="Drag and drop images here or select from your device"
                class="before:border-dashed before:border-4 before:border-gray-500 rounded-xl before:rounded-xl before:content-[url(@/assets/icons/svgs/admin/remix-icons/Vector.png)] after:content-[attr(after)] before:flex before:justify-center before:items-center before:w-full before:h-[12rem] before:backdrop-brightness-[.6] before:absolute z-50"
              >
                <img
                  v-if="file"
                  :src="image"
                  alt=""
                  class="object-cover h-[12rem] w-full rounded-xl"
                />
                <div v-else class="w-full h-[12rem] orunded-xl"></div>
              </div>
              <input
                type="file"
                @change="Changeimage"
                required
                :style="`background:url(${file}) no-repeat`"
                class="w-full absolute opacity-0 top-0 h-full bg-center bg-contain border-black bg-gray-100 item-center justify-center"
                name="article image"
                accept="image/*"
              />
            </figure>
            <i class="font-[500] text-blue-400 text-xs"
              >recommended: images should be 1280px x 860px for best
              resolution</i
            >
          </div>

          <div class="" id="videoContent">
            <label for="article image" class="font-bold">Upload Video</label>
            <figure class="w-full relative" id="article-image">
              <!-- <div
                after="Drag and drop images here or select from your device"
                class="before:border-dashed before:border-4 before:border-gray-500 rounded-xl before:rounded-xl before:content-[url(@/assets/icons/svgs/admin/remix-icons/Vector.png)] after:content-[attr(after)] before:flex before:justify-center before:items-center before:w-full before:h-[12rem] before:backdrop-brightness-[.6] before:absolute z-50"
              >
                <img
                  v-if="file"
                  :src="image"
                  alt=""
                  class="object-cover h-[12rem] w-full rounded-xl"
                />
                <div v-else class="w-full h-[12rem] orunded-xl"></div>
              </div> -->
              <input
                type="file"
                @change="loadVideo"
                required
                :style="`background:url(${video}) no-repeat`"
                class="w-full h-max bg-center bg-contain border-black item-center justify-center"
                name="article image"
                accept="video/*"
              />
              <video :src="thumbnail" controls></video>
            </figure>
          </div>
          <div class="" id="body">
            <label for="article image" class="font-bold">Body*</label>
            <div class="-z-50">
              <ckeditor
                required
                id="editor"
                :editor="editor"
                v-model="editorData"
                :config="editorConfig"
              />
            </div>
          </div>
          <div class="" id="keyNotes">
            <label for="summary" class="font-bold">Key Notes*</label>
            <textarea
              name="summary"
              id=""
              cols="30"
              rows="4"
              class="bg-gray-100 dark:bg-transparent p-1 focus:outline-none focus:border-4 focus:border-b-green-300 border-b w-full border-b-black dark:border-b-white"
              v-model="summary"
            ></textarea>
          </div>
          <div class="" id="metadata">
            <div class="border border-gray-400 rounded-lg capitalize">
              <p class="p-3 font-bold">Add to a Category*</p>
              <hr class="w-full border-gray-400" />
              <div class="lg:p-8 p-2 lg:text-md text-sm">
                <div
                  class="my-4"
                  v-for="choice in categorySel.autocompleteItems"
                  :key="choice.slug"
                >
                  <input
                    type="radio"
                    name="category"
                    :value="choice.slug"
                    id="category"
                    v-model="categorySel.selected"
                  />
                  <label for="category" class="lg:px-4 pl-2">{{
                    choice.cat_title
                  }}</label>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full md:flex-row items-center flex flex-col gap-4 mb-6"
            id="buttons"
          >
            <div class="w-full md:w-auto flex justify-center">
              <button
                class="bg-white text-black border border-black rounded-lg md:rounded-sm p-3 w-full mx-auto"
                @click="savePost()"
              >
                Add To Draft
              </button>
            </div>
            <div class="w-full md:w-auto flex justify-center">
              <button
                class="bg-black dark:bg-white/60 text-white dark:text-black p-3 w-full rounded-lg md:rounded-sm mx-auto"
                @click="publishVideo()"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import AppLogo from "../components/AppLogo.vue";
import { getAPI } from "../axios";
import SavedModal from "../components/Modal.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
// import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import { mapGetters } from "vuex";
import BaseIcon from "../components/BaseIcon.vue";
import BaseButton from "../components/BaseButton.vue";
import { useToast, POSITION } from "vue-toastification";
import ToastError from "../services/error.vue";
import { useDark, useToggle } from "@vueuse/core";
import PriceIndexModal from "../components/PriceIndexModal.vue";
import BaseModal from "../components/BaseModal.vue";
import { formatDate } from "../helpers/date";
import { useRouter } from "vue-router";

ClassicEditor.create(document.querySelector("#snippet-classic-editor"), {
  plugins: [
    // SimpleUploadAdapter
  ],
  toolbar: {},
  simpleUpload: {
    uploadUrl: `${import.meta.env.VITE_API_URL}/ckeditor/upload/`,
    withCredentials: false,
    error: {
      message:
        "The image upload failed because the image was too big (max 1.5MB).",
    },
  },
  // cloudServices: {
  //   // All predefined builds include the Easy Image feature.
  //   // Provide correct configuration values to use it.
  //   // Read more about Easy Image - https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/easy-image.html.
  //   // For other image upload methods see the guide - https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html.
  // },
})
  .then((editor) => {
    window.editor = editor;
  })
  .catch((err) => {});

export default {
  setup() {
    const toast = useToast();
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return { toast, isDark, toggleDark };
  },
  components: {
    SavedModal,
    BaseIcon,
    BaseModal,
    ckeditor: CKEditor.component,
    BaseButton,
    ToastError,
    AppLogo,
    PriceIndexModal,
  },
  data() {
    return {
      bc: false,
      et: false,
      ec: false,
      pages: 2,
      showModal: false,
      ge: false,
      showAddPost: false,
      title: "",
      subtitle: "",
      menuOpen: false,
      showPriceIndexModal: false,
      changePassword: false,
      new_password: "",
      old_password: "",
      summary: "",
      image: "",
      role: "",
      drafts: [],
      showDrafts: false,
      posts: [],
      reviewPosts: [],
      file: "",
      video: "",
      thumbnail: "",
      password: "",
      proFile: null,
      editorpost: false,
      errorCode: "",
      hasError: false,
      editorData: "",
      editor: ClassicEditor,
      categorySel: {
        selected: [],
        autocompleteItems: this.categoriesItem,
      },
      editorConfig: {
        // toolbar: ["bold", "italic", "|", "link"],
        ckfinder: {
          uploadUrl: `${import.meta.env.VITE_API_URL}/ckeditor/upload/`,
          withCredentials: false,
        },
        // image: {
        //   toolbar: ["toggleImageCaption", "imageTextAlternative"],
        // },
      },
      eConfig: {
        ui: {
          viewportOffset: { top: 90, right: 10, bottom: 10, left: 10 },
        },
      },
      word: "",
      results: null,
    };
  },
  computed: mapGetters({
    user: "getUserState",
  }),
  mounted() {
    const router = useRouter();
    router.beforeEach((to, from) => {
      this.menuOpen = false;
      document.body.classList.remove("overflow-hidden");
    });
  },
  async created() {
    this.role = this.user.role;
    this.reviewPosts = [];
    this.loadAdminPosts();
    this.loadDraftPosts();
    console.log(
      "userModule/drafts: " + this.user.drafts,
      "AdminProfile/drafts: " + this.drafts
    );
    this.file = this.user.profileImage;
    // this.loadDraftPosts();
    this.showPost("equity");
    getAPI
      .get("/categories")
      .then((response) => {
        // console.log(response);
        this.categorySel.autocompleteItems = response.data;
      })
      .catch((err) => {});
    await getAPI.get(`/users?email=${this.user.email}`).then((response) => {
      // console.log(response);
      this.$store.dispatch("userModule/updateUser", response.data[0]);
    });
  },
  methods: {
    formatDate,
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      document.body.classList.toggle("overflow-hidden");
    },
    goToPage(pageNum) {
      this.pages = pageNum;
      this.menuOpen = false;
      document.body.classList.remove("overflow-hidden");
    },
    updatePassword(e) {
      try {
        let newPass = getAPI.put(`/api/change-password/`, e, {
          headers: {
            Authorization: `Token ${this.user.token}`,
          },
        });
        console.log(newPass);
      } catch (error) {
        console.log(error);
      }
    },
    showGroups() {
      let re = getAPI
        .get(`/groups`, {
          headers: {
            Authorization: `Token ${this.user.token}`,
          },
        })
        .catch((e) => {
          console.log(e.response.data.detail);
        });
      console.log(re, this.user.token);
    },
    logout() {
      this.$store.dispatch("userModule/logout").then((e) => {
        this.$router.push("/admin");
      });
    },
    async searchMini(e) {
      await getAPI
        .get(`/posts?name=${e}&?author=${this.user.slug}`)
        .then((response) => {
          this.results = response.data;
        });
    },
    async publishPost() {
      let data = new FormData();
      let postSlug = this.title.split(" ").join("").toLowerCase();
      data.append("title", this.title);
      data.append("author", this.user.slug);
      data.append("categories", this.categorySel.selected);
      data.append("picked", this.editorpost);
      data.append("summary", this.summary);
      data.append("body", this.editorData);
      data.append("mainImage", this.file);
      data.append("slug", postSlug);
      data.append("sub_topic", this.subtitle);
      console.log(
        postSlug,
        data,
        this.title.replaceAll(" ", "-").toLowerCase()
      );

      try {
        this.toast.info("Creating Post...", {
          timeout: false,
          id: "login",
          position: POSITION.BOTTOM_CENTER,
        });
        await this.$store
          .dispatch("userModule/createPost", {
            formData: data,
            slug: this.user.slug,
            postSlug: this.title.replaceAll(" ", "-").toLowerCase(),
            auth: this.user.token,
          })
          .then((e) => {
            this.toast.dismiss("login");
            this.toast.success("Post Successful!", {
              timeout: 2000,
              id: "success",
              position: POSITION.BOTTOM_CENTER,
            });
            this.$router.go();
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        this.hasError = true;
        console.log(error);
        this.errorCode = error.response.status;
        this.toast.dismiss("login");
        setTimeout(() => {
          this.hasError = false;
          // console.log(this.hasError);
        }, 4000);
      }
    },
    async publishVideo() {
      let data = new FormData();
      let postSlug = this.title.split(" ").join("").toLowerCase();
      data.append("title", this.title);
      data.append("author", this.user.slug);
      data.append("categories", this.categorySel.selected);
      data.append("picked", this.editorpost);
      data.append("summary", this.summary);
      data.append("body", this.editorData);
      data.append("mainImage", this.file);
      data.append("slug", postSlug);
      data.append("sub_topic", this.subtitle);
      data.append("video", this.video);
      console.log(
        postSlug,
        data,
        this.title.replaceAll(" ", "-").toLowerCase()
      );

      try {
        this.toast.info("Creating Post...", {
          timeout: false,
          id: "login",
          position: POSITION.BOTTOM_CENTER,
        });
        await this.$store
          .dispatch("userModule/createPost", {
            formData: data,
            slug: this.user.slug,
            postSlug: this.title.replaceAll(" ", "-").toLowerCase(),
          })
          .then((e) => {
            console.log(e);
            this.toast.dismiss("login");
            this.toast.success("Post Successful!", {
              timeout: 2000,
              id: "success",
              position: POSITION.BOTTOM_CENTER,
            });
            this.$router.go();
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        this.hasError = true;
        // console.log(this.hasError);
        this.errorCode = error.response.status;
        setTimeout(() => {
          this.hasError = false;
          // console.log(this.hasError);
        }, 4000);
      }
    },
    async savePost() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("author", this.user.slug);
      data.append("categories", this.categorySel.selected);
      data.append("picked", this.editorpost);
      data.append("summary", this.summary);
      data.append("body", this.editorData);
      data.append("mainImage", this.file);
      data.append("slug", this.title.split(" ").join("").toLowerCase());

      let draft = {
        title: this.title,
        author: this.user.slug,
        categories: this.categorySel.selected,
        picked: this.editorpost,
        summary: this.summary,
        body: this.editorData,
        mainImage: this.image,
        slug: this.title.split(" ").join("").toLowerCase(),
      };

      let post = {
        formData: data,
        slug: this.user.slug,
        postSlug: this.title.replaceAll(" ", "-").toLowerCase(),
      };
      this.drafts.push(post);
      this.$store.dispatch("userModule/reviewPost", post);
      // console.log(this.drafts);
    },
    async UpdateProfile() {
      let data = new FormData();
      console.log(this.proFile === null && this.user.profileImage != null);
      if (this.proFile != null && this.file != "") {
        data.append("email", this.user.email);
        data.append("username", this.user.username);
        data.append("bio", this.user.bio);
        data.append("image", this.file);
        this.toast.info("Updating Profile...", {
          timeout: false,
          id: "login",
          position: POSITION.BOTTOM_CENTER,
        });
        await getAPI
          .patch("/users/" + this.user.slug, data)
          .then((response) => {
            this.toast.dismiss("login");
            this.toast.success("Post Successful!", {
              timeout: 2000,
              id: "success",
              position: POSITION.BOTTOM_CENTER,
            });
            this.success = true;
            console.log(response);
            this.mssg = "Updated";
            // this.$router.go();
          })
          .catch((err) => {
            this.hasError = true;
            console.log(err);
            this.errorCode = err.response.status;
          });

        console.log("image absent");
      } else if (this.proFile === null && this.user.profileImage != null) {
        data.append("email", this.user.email);
        data.append("username", this.user.username);
        data.append("bio", this.user.bio);
        this.toast.info("Updating Profile...", {
          timeout: false,
          id: "login",
          position: POSITION.BOTTOM_CENTER,
        });
        await getAPI
          .patch("/users/" + this.user.slug, data)
          .then((response) => {
            this.toast.dismiss("login");
            this.toast.success("Profile Updated!", {
              timeout: 2000,
              id: "success",
              position: POSITION.BOTTOM_CENTER,
            });
            this.success = true;
            console.log(response);
            this.mssg = "Updated";
            // this.$router.go();
          })
          .catch((err) => {
            this.hasError = true;
            console.log(err);
            this.errorCode = err.response.status;
          });
        console.log("image present");
      } else if (this.proFile != null && this.file === "") {
        data.append("email", this.user.email);
        data.append("name", this.user.name);
        data.append("bio", this.user.bio);
        this.toast.info("Updating Profile...", {
          timeout: false,
          id: "login",
          position: POSITION.BOTTOM_CENTER,
        });
        await getAPI
          .patch("/users/" + this.user.slug, data)
          .then((response) => {
            this.toast.dismiss("login");
            this.toast.success("Profile Updated!", {
              timeout: 2000,
              id: "success",
              position: POSITION.BOTTOM_CENTER,
            });
            this.success = true;
            console.log(response);
            this.mssg = "Updated";
            // this.$router.go();
          })
          .catch((err) => {
            this.hasError = true;
            console.log(err);
            this.errorCode = err.response.status;
          });
        console.log("image present");
      }
    },
    Changeimage(e) {
      let file = e.target.files[0];
      let imageSRC = URL.createObjectURL(file);
      this.file = file;
      this.image = imageSRC;
      console.log(this.file, this.image);
    },
    loadVideo(e) {
      let file = e.target.files[0];
      let imageSRC = URL.createObjectURL(file);
      this.video = file;
      this.thumbnail = imageSRC;
      console.log(this.video, this.thumbnail);
    },
    changeProfileImage(e) {
      let file = e.target.files[0];
      this.file = file;
      let imageSRC = URL.createObjectURL(file);
      this.proFile = imageSRC;
      console.log(this.file, this.proFile);
    },
    showblog() {
      this.showBlog = true;
      this.drafts = false;
      this.showAddPost = false;
    },
    async loadDraftPosts() {
      await getAPI.get(`/post/review?state=InReview`).then((response) => {
        let res = response.data.results;
        let count = response.data.count;
        // console.log(res, count);
        while (count > 0) {
          getAPI.get(`/posts/${res[count - 1].post}`).then((r) => {
            let res = r.data;
            // console.log(res);
            if (res.author === this.user.slug) {
              this.drafts.push(res);
            }
          });
          // console.log(this.drafts);
          count--;
        }
      });
    },
    async loadAdminPosts() {
      let result;
      await getAPI.get(`/post/review`).then(async (response) => {
        result = response.data.results;
        console.log(result);
        let count = response.data.count;
        while (count > 0) {
          await getAPI
            .get(`/posts/${result[count - 1].post}`)
            .then((r) => {
              let res = r.data;
              let pos = count;
              // this.reviewPosts.push(res);
              this.reviewPosts.push({
                id: result[0].id,
                title: res.title,
                slug: res.slug,
                picked: res.picked,
                publishedAt: res.publishedAt,
                summary: res.summary,
                body: res.body,
                mainImage: res.mainImage,
                categories: res.categories,
                author: res.author,
                review: result[pos].review,
              });
            })
            .then(count--);
        }
      });
    },
    async review(e) {
      let res = await getAPI
        .patch(`/post/review/${e.id}`, {
          post: e.slug,
          review: e.review,
        })
        .then((r) => {
          this.$router.go();
        })
        .catch((e) => {});
    },
    async deletePost(e) {
      let res = await getAPI
        .delete(`/posts/${e.slug}`)
        .then((e) => {
          this.$router.go();
        })
        .catch((e) => {});
    },
    async showDraftPosts() {
      this.pages = 3;
    },
    async showPost(e) {
      switch (e) {
        case "equity":
          this.ge = false;
          this.bc = false;
          this.ec = false;
          this.et = true;
          break;
        case "blockchain":
          this.ge = false;
          this.et = false;
          this.ec = false;
          this.bc = true;
          break;
        case "geopolitics":
          this.et = false;
          this.bc = false;
          this.ec = false;
          this.ge = true;
          break;
        case "economic":
          this.ge = false;
          this.et = false;
          this.bc = false;
          this.ec = true;
          break;

        default:
          break;
      }
      let res = await this.$store.dispatch("userModule/loadPostsByGenre", {
        slug: this.user.slug,
        category: e,
      });
      this.posts = res;
      // console.log(this.posts);
      // blog;
      this.showBlog = false;
      this.showDrafts = false;
      this.showAddPost = true;
    },
  },
};
</script>
<style>
.ck-editor__editable {
  height: auto;
  min-height: 12rem;
}

.toggler-wrapper {
  display: block;
  width: 45px;
  height: 25px;
  cursor: pointer;
  position: relative;
}

.toggler-wrapper input[type="checkbox"] {
  display: none;
}

.toggler-wrapper input[type="checkbox"]:checked + .toggler-slider {
  background-color: #44cc66;
}

.toggler-wrapper .toggler-slider {
  background-color: #ccc;
  position: absolute;
  border-radius: 100px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}

.toggler-wrapper .toggler-knob {
  position: absolute;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}
.toggler-wrapper.style-3
  input[type="checkbox"]:checked
  + .toggler-slider
  .toggler-knob {
  left: calc(100% - 19px - 3px);
}

.approved::before {
  position: absolute;
  top: 0%;
  left: -1%;
  content: "" attr(checked) "";
  border-radius: 50%;
  background-color: #29a247;
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.disapproved::before {
  position: absolute;
  top: 0%;
  left: -1%;
  content: "" attr(unchecked) "";
  border-radius: 50%;
  background-color: rgb(204, 47, 47);
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggler-wrapper.style-3 .toggler-knob {
  width: calc(25px + 6px);
  height: calc(25px + 6px);
  border-radius: 50%;
  left: -3px;
  top: -3px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 6px rgba(153, 153, 153, 0.75);
  box-shadow: 0 2px 6px rgba(153, 153, 153, 0.75);
}
</style>
