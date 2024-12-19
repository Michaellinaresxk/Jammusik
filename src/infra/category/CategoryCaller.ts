import {addDoc, deleteDoc, doc, query, where} from 'firebase/firestore';
import {auth} from '../api/firebaseConfig';
import {ApiSong} from '../song/ApiSong';
import type {ApiCategory} from './ApiCategory';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
} from '@firebase/firestore';
import Category from '../../domain/category/Category';

export class CategoryCaller {
  private db = getFirestore();
  async createCategory(title: string): Promise<ApiCategory> {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      throw new Error('userId is undefined!');
    }

    const categoryData = {
      title: title,
      userId: userId,
    };

    // Save data in firestore
    const categoryRef = await addDoc(
      collection(this.db, 'categories'),
      categoryData,
    );

    return {
      id: categoryRef.id,
      ...categoryData,
    };
  }

  async getCategories(userId: string): Promise<Category[]> {
    try {
      const categoriesRef = collection(this.db, 'categories');
      const q = query(categoriesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return new Category(doc.id, data.title, data.userId);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
  async getSongListByCategory(
    userId: string,
    categoryId: string,
  ): Promise<ApiSong[]> {
    if (!categoryId || !userId) {
      console.error(
        'categoryId or userId is not defined or is an empty string!',
      );
      return [];
    }

    try {
      const db = getFirestore();
      const songCollection = collection(db, 'songs');

      let songQuery;
      if (categoryId === 'Library') {
        songQuery = query(songCollection, where('userId', '==', userId));
      } else {
        songQuery = query(
          songCollection,
          where('categoryId', '==', categoryId),
          where('userId', '==', userId),
        );
      }

      const querySnapshot = await getDocs(songQuery);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ApiSong[];
    } catch (error) {
      console.error(`Error fetching songs:`, error);
      throw error;
    }
  }

  async getAllSongsByUserId(userId: string): Promise<ApiSong[]> {
    const db = getFirestore();
    try {
      const songsCollection = collection(db, 'songs');
      const songsQuery = query(songsCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(songsQuery);
      return querySnapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()} as ApiSong;
      });
    } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
    }
  }

  async updateCategory(categoryId: string, newTitle: string): Promise<void> {
    if (!this.db || !categoryId) {
      throw new Error('Firestore instance or categoryId is undefined!');
    }

    const categoryDoc = doc(this.db, 'categories', categoryId);

    try {
      await updateDoc(categoryDoc, {
        title: newTitle,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async deleteCategory(userId: string, categoryId: string) {
    if (!this.db || !userId || !categoryId) {
      throw new Error('Firestore instance or categoryId is undefined!');
    }

    const specificCategoryDoc = doc(this.db, 'categories', categoryId);
    await deleteDoc(specificCategoryDoc);
  }
}
