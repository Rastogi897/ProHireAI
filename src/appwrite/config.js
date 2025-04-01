import { Client, Databases, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;

  constructor() {
    console.log(import.meta.env.VITE_URL);
    this.client
      .setEndpoint(import.meta.env.VITE_URL)
      .setProject(import.meta.env.VITE_PROJECT_ID);

    this.databases = new Databases(this.client);
    console.log(this.client, " ---- ", this.databases);
  }

  async createProfile({ name, email, linkdin, role, text }) {
    try {
      return await this.databases.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        ID.unique(),
        { name, email, linkdin, role, text }
      );
    } catch (err) {
      console.log("Error in create profile: ", err);
    }
  }

  async fetchAllProfile(role) {
    try {
      return await this.databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        [Query.equal("role", role)]
      );
    } catch (err) {
      console.log("Error fetching all profiles: ", err);
    }
  }
}

const service = new Service();
export default service;
