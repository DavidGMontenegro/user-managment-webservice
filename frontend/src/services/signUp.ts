import { application } from "express";
import http from "../http-common";

const API_URL_PATH = "/users";

class UserManagement {
    signUp (name: string, surnames:string, email: string, role: number, username: string, password: string) {
        const user = {username, name, surnames, email, role, password};
        try {
            return http.post(API_URL_PATH + "/signup", user);
        } catch (error){
            console.log(error)
        }
    }

    activateAccount(token: string) {
        try {
            return http.put(API_URL_PATH + "/verify-account", {token});
        } catch (error){
            console.log(error)
        }
    }

    logIn(username: string, password: string){
        const user_data = {username, password };
        return http.put(API_URL_PATH + "/login", user_data);
    }

    loadUserData(token: string) {
        try {
            return http.put(API_URL_PATH + "/get-user-data", {token});
        } catch (error){
            console.log(error)
        }
    }

    getUserSubjects(token: string) {
        try {
            return http.put(API_URL_PATH + "/get-user-subjects", {token});
        } catch (error){
            console.log(error)
        }
    }

    changeUserData(name: string, surnames: string, username: string, id: number) {
        try {
            const res = http.put(API_URL_PATH + "/change-user-data", {name, surnames, username, id})
            console.log('Respuesta aquí: ',  res)
            return res
        } catch (error) {
            console.log(error);
        }
    }

    sendPasswordEmail(email: string){
        try {
            return http.put(API_URL_PATH + "/send-password-email", {email})
        } catch (error) {
            console.log(error);
        }
    }

    changePassword(password: string, token: string) {
        try {
            return http.put(API_URL_PATH + "/change-password", {password, token})
        } catch (error) {
            console.log(error);
        }
    }

    uploadProfilePicture(selectedFile: File) {
        try {
            return http.post(API_URL_PATH + "/upload-profile-picture", {selectedFile})
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserManagement();