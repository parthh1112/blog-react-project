/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf"


export class AuthService {
    clinet = new Client();
    account;
    constructor() {
        this.clinet
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.clinet)
    }

    async createAccount({ email, password, name }) {

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // calling login account
                this.login(email, password)
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw error;

        }


    }



    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error

        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error;

        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error;

        }
    }
}

const authService = new AuthService()


export default authService