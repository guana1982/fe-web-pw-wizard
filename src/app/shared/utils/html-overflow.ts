export const htmlIsOverFlowing = (el: HTMLElement, direction: 'vertical' | 'horizontal' = 'vertical'): boolean => {
    // const curOverflow = el.style.overflow;
      
    // if ( !curOverflow || curOverflow === "visible" )
    //     el.style.overflow = "hidden";
    
    if( direction === 'vertical' ) {
        return el.clientHeight < el.scrollHeight;
    }
    if( direction === 'horizontal' ) {
        return el.clientWidth < el.scrollWidth;
    }
      
    return false;
}