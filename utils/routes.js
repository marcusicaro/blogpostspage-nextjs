export let postsRoute = 'http://localhost:3002/posts/';
export const getCommentsRoute = (postId) => 'http://localhost:3002/posts/' + postId + 'comments/';
export let usersRoute = 'http://localhost:3002/users/';
export let userGetInfoRoute = 'http://localhost:3002/' + 'username/';
export let usersAdminRoute = usersRoute + 'admin/';
export let usersSigninRoute = usersRoute + 'signin/';
export let usersSignupRoute = usersRoute + 'signup/';
export let usersLogoutRoute = usersRoute + 'logout/';

class CommentsRoute {
    constructor(postId) {
        this.postId = postId,
        this.commentId = commentId,
        this.localUrl
    }
    getCommentsOnPostUrl() {
        return localUrl+'/posts'+postId+'/comments'
    }

}
