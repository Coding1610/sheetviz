export const RouteLandingPage = '/';

export const RouteSignIn = '/sign-in';
export const RouteSignUp = '/sign-up';

export const RouteIndex = '/dashboard';

export const RouteProfileUser = '/dashboard/user/profile';
export const RouteProfileAdmin = '/dashboard/admin/profile';

export const RouteUploadFile = '/dashboard/upload-file';
export const RouteUploadFilePreview = '/dashboard/uploaded-file-preview';

export const RouteChartVisualization = (file_id) => {
    if(file_id){
        return `/dashboard/visualization/${file_id}`;
    }
    else{
        return '/dashboard/visualization/:file_id';
    }
};

export const RouteCateDetails = '/dashboard/categories';
export const RouteAddCate = '/dashboard/categories/add';

export const RouteEditCate = (cate_id) => {
    if(cate_id){
        return `/dashboard/categories/edit/${cate_id}`;
    }
    else{
        return `/dashboard/categories/edit/:cate_id`;
    }
};

export const RouteBlog = '/dashboard/blog';
export const RouteBlogAdd = '/dashboard/blog/add';

export const RouteBlogEdit = (blog_id) => {
    if(blog_id){
        return `/dashboard/blog/edit/${blog_id}`;
    }
    else{
        return `/dashboard/blog/edit/:blog_id`;
    }
};

export const RouteBlogDetails = (category, blog) => {
    if(!category || !blog){
        return '/dashboard/blog/:category/:blog';
    }
    else{
        return `/dashboard/blog/${category}/${blog}`;
    }
};

export const RouteBlogByCategory = (category) => {
    if(!category){
        return '/dashboard/blog/:category/';
    }
    else{
        return `/dashboard/blog/${category}`;
    }
};

export const RouteSearch = (q) => {
    if(q){
        return `/dashboard/blog-search?q=${q}`;
    }
    else{
        return '/dashboard/blog-search';
    }
};

export const RouteGetComments = '/dashboard/get-all-comments';
export const RouteGetAllUsers = "/dashboard/get-all-users";

// Client Side
export const RouteGetMyBlogs = '/dashboard/blog/my-blogs';
export const RouteMyBlogsComments = '/dashboard/comment/my-blogs-comments';
export const RouteCommentsByMe = '/dashboard/comment/comments-by-me';

// 404 Not Found
export const RouteNotFound = '*';