/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
import { trackForMutations } from "@reduxjs/toolkit/dist/immutableStateInvariantMiddleware";
import conf from "../conf/conf"

import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // ------------slug is document-id
    async createPost({ title, slug, content, featuredImg, status, userId }) {
        try {
            return await this.databases.createPost(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                title,
                content,
                status,
                featuredImg,
                userId
            })
        } catch (error) {
            throw error;

        }

    }

    async updatePost(slug, { title, content, featuredImg, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                title,
                content,
                status,
                featuredImg,
            })
        } catch (error) {
            throw error;
        }

    }



    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug)
            return true;
        } catch (error) {
            throw error
            return false

        }
    }

    async getDocument(slug) {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    }

    async getPost() { // querying the documents
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", "active")]

            )
        }
        catch (error) {
            throw error
        }
    }

    // file upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error

        }
    }


    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error;
            return false;
        }
    }




    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
        } catch (error) {
            throw error
        }
    }
}

const service = new Service()
export default service;