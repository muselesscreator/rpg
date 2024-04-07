import * as React from 'react';
const SlotImage = ({
  className,
  dropRef,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="none" viewBox="0 0 200 200"
    className="slot-container"
    ref={dropRef}
  >
    <path
      className={className}
      d="M0 47.423c0-9.4 6.536-17.517 15.77-19.274C36.483 24.209 73.342 18 100 18s63.517 6.208 84.23 10.149c9.234 1.757 15.77 9.875 15.77 19.274v102.951c0 9.05-6.069 16.959-14.88 19.022-20.437 4.785-57.769 12.538-85.12 12.538-27.351 0-64.683-7.753-85.12-12.538C6.069 167.333 0 159.424 0 150.374V47.424Z" 
    />
  </svg>
);
const WrappedSlotImage = React.forwardRef(SlotImage);
export default WrappedSlotImage;
