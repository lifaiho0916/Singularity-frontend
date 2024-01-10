import Dexie from 'dexie';

class ReactDexie extends Dexie {
    singularity: Dexie.Table<any, string>; // No definite assignment assertion

    constructor(databaseName: string) {
        super(databaseName);
        this.version(1).stores({
            singularity: 'datakey' 
        });
        this.singularity = this.table('singularity');
    }
}

const db = new ReactDexie('ReactDexie');

export async function saveDataInIndexDB(data: any) {
    if (data) {
        await db.singularity.clear();
        await db.singularity.add({ datakey: 'medias', data });
    }
}

export async function getDataFromIndexDB() {
    const data = await db.singularity
        .where('datakey')
        .equals('medias')
        .toArray();
    if (data && data.length > 0) {
        return data[0].data;
    }
    return null;
}