import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import NewPost from "../components/NewPost.vue";
import ShowPost from "../components/ShowPost.vue";
import EditPost from "../components/EditPost.vue";

export default function(store: any) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        component: Home
      },
      {
        path: "/posts/:id",
        component: ShowPost
      },
      {
        path: "/posts/:id/edit",
        component: EditPost,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/posts/new",
        component: NewPost,
        meta: {
          requiresAuth: true
        }
      }
    ]
  });

  router.beforeEach((to, from, next) => {
    const auth = !!store.getState().users.currentUserId;

    // if auth is not required
    if (!to.meta.requiresAuth) {
      next();
      return;
    }

    // if auth is required
    if (to.meta.requiresAuth && auth) {
      next();
    } else {
      next({
        path: "/"
      });
    }

  });


  return router;
}