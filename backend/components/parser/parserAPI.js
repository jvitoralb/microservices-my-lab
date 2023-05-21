import { Router } from 'express';
import { getParserHome, getUserHeader } from './parserController.js'

const headerParserV2 = Router();

headerParserV2.get('/', getParserHome);
headerParserV2.get('/api/whoami', getUserHeader);

export default headerParserV2;