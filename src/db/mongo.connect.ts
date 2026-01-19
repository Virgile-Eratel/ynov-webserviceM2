import { connect } from 'mongoose';

export async function connectToMongo(uri: string) {
  try {
    await connect(uri);
    console.log('Connect to Mongodb');
  } catch (e: unknown) {
    console.error(`Error connect to Mongodb`, e);
    process.exit();
  }
}
