import { Router } from 'express';
import { getHome, getTimestampNow, getCustomTimestamp } from './timestampController.js';

const timestampV2 = Router();

timestampV2.get('/', getHome);
timestampV2.get('/api/', getTimestampNow);
timestampV2.get('/api/:date?', getCustomTimestamp);

export default timestampV2;