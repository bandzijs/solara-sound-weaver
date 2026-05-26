import 'react'

// Allow Alpine.js attributes on all HTML elements
declare module 'react' {
  interface HTMLAttributes<T> {
    'x-data'?: string
    'x-show'?: string
    'x-text'?: string
    'x-html'?: string
    'x-model'?: string
    'x-ref'?: string
    'x-init'?: string
    'x-effect'?: string
    'x-cloak'?: string
    'x-ignore'?: string
    'x-transition'?: string
    'x-on:click'?: string
    'x-on:submit'?: string
    'x-on:change'?: string
    'x-on:input'?: string
    'x-on:keydown'?: string
    'x-on:keydown.enter'?: string
    'x-bind:class'?: string
    'x-bind:disabled'?: string
    'x-bind:aria-expanded'?: string
    'x-transition:enter'?: string
    'x-transition:enter-start'?: string
    'x-transition:enter-end'?: string
    'x-transition:leave'?: string
    'x-transition:leave-start'?: string
    'x-transition:leave-end'?: string
  }
}
