import { createStartHandler, defaultRenderHandler } from '@tanstack/react-start/server'
import { getRouter } from './router'

export default createStartHandler({
  createRouter: getRouter,
  getWebRequest: () => {
    // In a real env, this helps the server understand the request context
    return new Request('http://localhost:3000')
  },
})(defaultRenderHandler)