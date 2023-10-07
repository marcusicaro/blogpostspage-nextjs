let currentLocalUrl = 'https://blog-production-799e.up.railway.app';
const env = process.env.NODE_ENV;
if (env == 'development') {
  currentLocalUrl = 'http://localhost:3002';
}

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
