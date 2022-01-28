'use strict';


export default class ApiResponse {

     async successResponse(msg: string, data: any) {
        return {
            success: true,
            message: msg,
            data: data
        }
    }

    async errorResponse(msg: string) {
        return {
            success: false,
            message: msg,
            data: null
        }
    }

}

