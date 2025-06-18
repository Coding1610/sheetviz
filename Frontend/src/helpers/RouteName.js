export const RouteLandingPage = '/';

export const RouteSignIn = '/sign-in';
export const RouteSignUp = '/sign-up';

export const RouteIndex = '/dashboard';

export const RouteProfileUser = '/dashboard/user/profile';
export const RouteProfileAdmin = '/dashboard/admin/profile';

export const RouteUploadFile = '/dashboard/upload-file';
export const RouteUploadFilePreview = '/dashboard/uploaded-file-preview';

export const RouteChartVisualization = (file_name) => {
    if(file_name){
        return `/dashboard/visualization/${file_name}`;
    }
    else{
        return '/dashboard/visualization/:file_name';
    }
};

export const RouteFileView = (fileId) =>{
    if(fileId){
        return `/dashboard/file-view/${fileId}`;
    }
    else{
        return '/dashboard/file-view/:fileId';
    }
}

export const RouteUploadedFiles = '/dashboard/uploaded-files';

export const RouteGetAllFiles = '/dashboard/get-all-files';
export const RouteGetAllUsers = "/dashboard/get-all-users";

// 404 Not Found
export const RouteNotFound = '*';