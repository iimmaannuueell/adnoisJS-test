'use strict';


export default class ApiResponse {

    //  async(msg: string, data: any) => {
    //     return {
    //         success: true,
    //         message: msg,
    //         data: data
    //     }
    // }

    errorResponse(msg: string) {
        return {
            success: false,
            message: msg,
            data: null
        }
    }

}

// module.exports = ApiResponse;
