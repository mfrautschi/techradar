export enum Category {
  Techniques = 'Techniques',
  Tools = 'Tools',
  Platforms = 'Platforms',
  LanguagesAndFrameworks = 'Languages & Frameworks'
}

  export function getCategory(pCategory: string): Category {
    const category = Object.values(Category).find(c => c === pCategory);
    if (category) {
      return category;
    } else {
      throw new Error('Category not found');
    }
  }
