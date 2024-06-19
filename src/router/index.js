import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import SearchPage from "@/components/SearchPage.vue";
import SubscriptionsPage from "@/components/SubscriptionsPage.vue"; 
import DetailsPage from "@/components/DetailsPage.vue";
import SuccessPage from "@/components/SuccessPage.vue";
import ErrorPage from "@/components/ErrorPage.vue"
import LoginPage from "@/components/LoginPage.vue";
import ModeratorOpportunitiesPage from "@/components/ModeratorOpportunitiesPage.vue"

const routes = [
  {
    path: "/opportunities",
    name: "HomePage",
    component: HomePage,
    meta: { backgroundColor: "black" },
  },
  {
    path: "/search",
    name: "SearchPage",
    component: SearchPage,
    meta: { backgroundColor: "white" },
  },
  {
    path: "/opportunities/:uuid",
    name: "DetailsPage",
    component: DetailsPage,
    props: true,
    meta: { backgroundColor: "white" },
  },
  {
    path: "/subscriptions",
    name: "SubscriptionsPage",
    component: SubscriptionsPage,
    meta: { backgroundColor: "white" },
  },
  {
    path: "/success",
    name: "SuccessPage",
    component: SuccessPage,
    meta: { backgroundColor: "black" },
  },
  {
    path: "/error",
    name: "ErrorPage",
    component: ErrorPage,
    meta: { backgroundColor: "white" },
  },
  {
    path: "/moderator/sign-in",
    name: "LoginPage",
    component: LoginPage,
    meta: { backgroundColor: "white" },
  },
  {
    path: "/moderator/opportunities",
    name: "ModeratorOpportunitiesPage",
    component: ModeratorOpportunitiesPage,
    meta: { backgroundColor: "white" },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/opportunities",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
