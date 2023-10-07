let currentLocalUrl;
const env = process.env.NODE_ENV;
if (env == 'development') {
  currentLocalUrl = 'http://localhost:3002';
} else if (env == 'production') {
  currentLocalUrl = 'https://blog-production-799e.up.railway.app/';
}
// export let postsRoute = 'http://localhost:3002/posts/';
// export const getCommentsRoute = (postId) =>
//   'http://localhost:3002/posts/' + postId + 'comments/';
// export let usersRoute = 'http://localhost:3002/users/';
// export let userGetInfoRoute = 'http://localhost:3002/' + 'username/';
// export let usersAdminRoute = usersRoute + 'admin/';
// export let usersSigninRoute = usersRoute + 'signin/';
// export let usersSignupRoute = usersRoute + 'signup/';
// export let usersLogoutRoute = usersRoute + 'logout/';

class CommentsRoute {
  localUrl: string;
  constructor(localUrl: string) {
    this.localUrl = localUrl;
  }
  getCommentsUrl(searchParam: string): URL {
    return new URL(this.localUrl + '/comments/' + searchParam);
  }
  getCommentsOnPostUrl(postId: string): URL {
    return new URL(this.localUrl + '/posts/' + postId + '/comments') as URL;
  }
  getCommentUrl(postId: string, commentId: string): URL {
    return new URL(
      this.localUrl + '/posts/' + postId + '/comments/' + commentId
    );
  }
}

class PostsRoute {
  localUrl: string;
  constructor(localUrl: string) {
    this.localUrl = localUrl;
  }
  getPostsUrl(postId: string): URL {
    return new URL(this.localUrl + '/posts/' + postId);
  }
  getSinglePostUrl(postId: string): URL {
    return new URL(this.localUrl + '/posts/' + postId);
  }
}

class UsersRoute {
  localUrl: string;
  constructor(localUrl: string) {
    this.localUrl = localUrl;
  }
  getLoginDataUrl(): URL {
    return new URL(this.localUrl + '/username');
  }
  getAdminUrl(): URL {
    return new URL(this.localUrl + '/users/admin');
  }
  getSigninUrl(): URL {
    return new URL(this.localUrl + '/users/signin');
  }
  getSignupUrl(): URL {
    return new URL(this.localUrl + '/users/signup');
  }
  getLogoutUrl(): URL {
    return new URL(this.localUrl + '/users/logout');
  }
}

export let commentsRoute = new CommentsRoute(currentLocalUrl);
export let postsRoute = new PostsRoute(currentLocalUrl);
export let usersRoute = new UsersRoute(currentLocalUrl);
