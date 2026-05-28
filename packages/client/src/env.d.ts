/// <reference types="vite/client" />

declare const __APP_VERSION__: string

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-virtual-scroller' {
  import { DefineComponent } from 'vue'

  export interface ScrollToOptions {
    top?: number
    left?: number
    behavior?: 'auto' | 'smooth'
    align?: 'auto' | 'start' | 'center' | 'end'
    offset?: number
  }

  export interface DynamicScrollerSlots {
    before: () => any
    after: () => any
    empty: () => any
    default: (props: { item: any; index: number; active: boolean }) => any
  }

  export type DynamicScrollerExposed<T = any> = {
    scrollToTop: (options?: ScrollToOptions) => void
    scrollToBottom: (options?: ScrollToOptions) => void
    scrollToItem: (index: number, options?: ScrollToOptions) => void
    scrollToPosition: (offset: number, options?: ScrollToOptions) => void
    getScroll: () => { top: number; left: number }
    scrollable: HTMLElement | undefined
  }

  export const RecycleScroller: DefineComponent<{
    items?: any[]
    keyField?: string
    direction?: 'vertical' | 'horizontal'
    buffer?: number
    pageMode?: boolean
    prerender?: number
    emitUpdate?: boolean
    sizeField?: string
    typeField?: string
    directionField?: string
    bufferField?: string
    pageModeField?: string
    prerenderField?: string
    listTag?: string
    itemTag?: string
    listClass?: string | object | any[]
    itemClass?: string | object | any[]
    size?: number
    minSize?: number
    maxSize?: number
  }, {}, any>

  export const DynamicScroller: DefineComponent<{
    items?: any[]
    keyField?: string
    direction?: 'vertical' | 'horizontal'
    buffer?: number
    pageMode?: boolean
    prerender?: number
    emitUpdate?: boolean
    minSize?: number
    maxSize?: number
    sizeField?: string
    typeField?: string
    listTag?: string
    itemTag?: string
    listClass?: string | object | any[]
    itemClass?: string | object | any[]
  }, DynamicScrollerExposed, DynamicScrollerSlots>

  export const DynamicScrollerItem: DefineComponent<{
    item: any
    active?: boolean
    sizeDependencies?: any[]
    watchData?: boolean
    tag?: string
    emitResize?: boolean
  }, {}, any>
}
