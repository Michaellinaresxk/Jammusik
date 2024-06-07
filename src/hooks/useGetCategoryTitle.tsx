import { getFirestore, doc, getDoc } from "@firebase/firestore";

export const useGetCategoryTitle = async (
  categoryId: string,
): Promise<string> => {
  if (!categoryId) {
    throw new Error("categoryId is undefined or empty!");
  }

  const db = getFirestore();
  const categoryDocRef = doc(db, "categories", categoryId);
  const categoryDoc = await getDoc(categoryDocRef);

  if (!categoryDoc.exists()) {
    throw new Error("Category not found!");
  }

  return categoryDoc.data()?.title || "";
};
