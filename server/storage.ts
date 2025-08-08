import { type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  
  // Product operations
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  getAllProducts(): Promise<Product[]>;
  getProductBySku(sku: string): Promise<Product | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Create admin user
    const adminId = randomUUID();
    const admin: User = {
      id: adminId,
      email: "admin@example.com",
      password: "password",
      firstName: "John",
      lastName: "Anderson",
      role: "admin",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      phone: "+1 (555) 123-4567",
      bio: "System administrator with 8+ years of experience managing enterprise applications and infrastructure.",
      lastLogin: new Date(),
      createdAt: new Date(),
    };
    this.users.set(adminId, admin);

    // Create sample users
    const users = [
      {
        email: "emma@example.com",
        firstName: "Emma",
        lastName: "Watson",
        role: "admin",
        avatar: "https://pixabay.com/get/gd9bc21d391777b0cac00bc8e15c1b06c354388057ba14582b48f7f04b7516f02f8ca9bf53588292e26db1db28e190b0ad83441ba635e52003ac083064b1610c9_1280.jpg",
      },
      {
        email: "james@example.com",
        firstName: "James",
        lastName: "Wilson",
        role: "manager",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      },
    ];

    users.forEach(userData => {
      const id = randomUUID();
      const user: User = {
        id,
        email: userData.email,
        password: "password",
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        status: "active",
        avatar: userData.avatar,
        phone: "+1 (555) 123-4567",
        bio: "",
        lastLogin: new Date(Date.now() - Math.random() * 86400000 * 7), // Random within last week
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 30), // Random within last month
      };
      this.users.set(id, user);
    });

    // Create sample products
    const products = [
      {
        name: "Wireless Headphones",
        description: "Premium quality wireless headphones with noise cancellation",
        price: "199.99",
        stock: 47,
        sku: "WH001",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        status: "active",
      },
      {
        name: "Smartphone Pro",
        description: "Latest generation smartphone with advanced features",
        price: "899.99",
        stock: 3,
        sku: "SP001",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        status: "active",
      },
      {
        name: "Laptop Pro",
        description: "High-performance laptop for professionals and creators",
        price: "1299.99",
        stock: 23,
        sku: "LP001",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        status: "active",
      },
      {
        name: "Smart Watch",
        description: "Advanced smartwatch with health monitoring features",
        price: "349.99",
        stock: 0,
        sku: "SW001",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        status: "inactive",
      },
    ];

    products.forEach(productData => {
      const id = randomUUID();
      const product: Product = {
        id,
        ...productData,
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 30),
        updatedAt: new Date(Date.now() - Math.random() * 86400000 * 7),
      };
      this.products.set(id, product);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      email: insertUser.email,
      password: insertUser.password,
      firstName: insertUser.firstName,
      lastName: insertUser.lastName,
      role: insertUser.role || "user",
      status: insertUser.status || "active",
      avatar: insertUser.avatar || null,
      phone: insertUser.phone || null,
      bio: insertUser.bio || null,
      lastLogin: null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Product methods
  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      id,
      name: insertProduct.name,
      description: insertProduct.description || null,
      price: insertProduct.price,
      stock: insertProduct.stock || 0,
      sku: insertProduct.sku,
      image: insertProduct.image || null,
      status: insertProduct.status || "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { 
      ...product, 
      ...updates,
      updatedAt: new Date(),
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductBySku(sku: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.sku === sku);
  }
}

export const storage = new MemStorage();
