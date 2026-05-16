// ─────────────────────────────────────────────────────────────────
// Pages: Home, Product, About + UploadArt + ApplePay sheet
// ─────────────────────────────────────────────────────────────────

const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;

// ═════════ TREE EYE TRACKER ═════════
function TreeEyes() {
  const svgRef = uR(null);
  const [off, setOff] = uS({ x: 0, y: 0 });

  uE(() => {
    const move = (e) => {
      if (!svgRef.current) return;
      const r = svgRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const t = Math.min(dist, 400) / 400;
      const max = 1.5;
      setOff({ x: (dx / dist) * t * max, y: (dy / dist) * t * max });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 83 137" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 420, height: "auto", display: "block" }}>
      <g clipPath="url(#treeClip)">
        <path d="M40.3908 0.709961C40.7152 0.73463 40.9345 0.813462 41.093 0.917969C41.2847 1.04448 41.4406 1.24218 41.5783 1.55371C41.7191 1.87239 41.8273 2.2786 41.9406 2.79102C42.0496 3.28348 42.1679 3.89813 42.3195 4.53809V4.53906C42.5599 5.54736 42.5719 5.97598 42.6799 6.54883C42.7865 7.11434 42.9682 7.63918 43.4807 8.57812C44.0084 9.54499 44.4258 9.96508 44.8234 10.3633C45.1869 10.7272 45.5314 11.071 45.9953 11.9229C46.5044 12.8577 46.8211 13.3008 47.1311 13.7344C47.4281 14.1498 47.7188 14.5564 48.2014 15.4404C48.7044 16.362 48.9891 16.8103 49.2707 17.2529C49.5456 17.685 49.8184 18.1121 50.3068 19.0068C50.7516 19.8216 50.7791 20.3083 50.8117 20.8477C50.8481 21.4495 50.8899 22.1055 51.4367 23.1074C51.9932 24.127 52.8116 24.601 53.2268 24.9443C53.4446 25.1246 53.5472 25.255 53.593 25.3965C53.6382 25.5365 53.6535 25.7713 53.51 26.207V26.209C53.376 26.6183 53.2359 26.7947 53.1262 26.8809C53.0203 26.9639 52.8823 27.0109 52.6359 27.0322C52.1745 27.072 51.2801 26.9847 50.2893 27.3564C49.4867 27.6575 48.9197 27.5271 48.2463 27.5479C47.9272 27.5577 47.5515 27.6111 47.2277 27.8809C46.9112 28.1449 46.7239 28.5487 46.6047 29.0664C46.4654 29.6658 46.4796 30.1658 46.7082 30.5771C46.9308 30.9774 47.306 31.194 47.6242 31.3516C48.2984 31.6852 48.9591 31.887 49.4787 32.6709C50.0149 33.4802 50.032 34.021 50.0529 34.6426C50.0759 35.3259 50.1036 36.0909 50.7932 37.1318V37.1328C51.4684 38.1496 52.0803 38.5053 52.6428 38.8301C53.1502 39.123 53.6093 39.386 54.1623 40.2178C54.7677 41.1283 55.0331 41.6032 55.301 42.083C55.5759 42.5753 55.8542 43.0732 56.4768 44.0107C57.0998 44.949 57.4532 45.3986 57.802 45.8418C58.1415 46.2734 58.4774 46.6996 59.0803 47.6074C59.4081 48.1011 59.7272 48.4644 60.0041 48.7588C60.294 49.067 60.4912 49.2563 60.6467 49.4629C60.7845 49.6461 60.8621 49.811 60.8889 50.0254C60.9175 50.2547 60.8927 50.5783 60.7551 51.0811C60.6279 51.5455 60.4935 51.7879 60.3713 51.9248C60.2607 52.0486 60.1304 52.1199 59.9221 52.1748C59.6801 52.2385 59.4245 52.2615 59.0119 52.3291C58.6242 52.3927 58.1665 52.4887 57.6399 52.6895C57.2482 52.8386 56.8405 52.8648 56.4133 52.833C55.9604 52.7993 55.573 52.7124 55.1106 52.6484C54.6944 52.5909 54.2096 52.5526 53.7707 52.7207C53.3486 52.8825 53.0384 53.2044 52.8342 53.6816L52.7531 53.8965C52.5526 54.4985 52.5659 55.018 52.7951 55.4717C53.0104 55.8973 53.3837 56.195 53.7307 56.4346C54.4786 56.9507 55.2195 57.3065 55.6818 58.1064C56.2041 59.0107 56.4092 59.4874 56.6184 59.9727C56.836 60.4776 57.0588 60.9921 57.6076 61.9424V61.9434C58.1879 62.9456 58.6935 63.3491 59.1662 63.7246C59.5937 64.0642 59.989 64.3771 60.4777 65.2246C60.9607 66.0622 61.0115 66.5645 61.0695 67.1172C61.134 67.7307 61.2062 68.3945 61.7922 69.4092C62.3175 70.3188 62.5375 70.7913 62.76 71.2705C62.9894 71.7647 63.2222 72.2663 63.7678 73.2109L63.9846 73.5625C64.4836 74.3194 64.9416 74.663 65.3703 74.9834C65.812 75.3134 66.2166 75.6144 66.7014 76.4551C67.179 77.2835 67.2111 77.7899 67.2492 78.3535C67.2916 78.98 67.3408 79.6642 67.9318 80.6855L68.2649 81.2871C68.5463 81.8237 68.6895 82.1854 68.8352 82.5527C69.0391 83.0671 69.2482 83.5941 69.7981 84.5498C70.1227 85.1142 70.6024 85.5 71.0803 85.791C71.5443 86.0735 72.0706 86.3011 72.4543 86.4912C72.8787 86.7015 73.1303 86.8667 73.2531 87.0371C73.3334 87.1487 73.3976 87.3127 73.2434 87.6846V87.6855C73.1053 88.0207 72.9636 88.0857 72.8576 88.1084C72.6928 88.1435 72.4463 88.1072 72.0539 87.9805C71.8658 87.9197 71.6691 87.8477 71.4484 87.7686C71.2325 87.6911 70.9983 87.609 70.7561 87.5381C70.2734 87.3968 69.726 87.2896 69.1535 87.3496C68.2348 87.4459 67.779 87.4105 67.3068 87.374C66.802 87.335 66.2802 87.2953 65.2785 87.4004C64.8602 87.4442 64.4418 87.4061 64.0178 87.3418C63.6258 87.2823 63.1477 87.1833 62.7609 87.1426C62.3553 87.0999 61.9066 87.0991 61.4924 87.2852C61.0568 87.481 60.7352 87.8483 60.5158 88.3838C60.2748 88.9725 60.2929 89.5003 60.6057 89.9414C60.8779 90.3252 61.3278 90.5665 61.7199 90.7529C62.1564 90.9604 62.5602 91.1175 62.969 91.3486C63.361 91.5703 63.6863 91.8252 63.9094 92.1611H63.9104C64.1604 92.5363 64.2736 92.8455 64.3274 93.1182C64.3828 93.3996 64.3798 93.6619 64.3742 93.9785C64.3627 94.6311 64.3493 95.3828 65.0022 96.3662C65.3801 96.9354 65.758 97.505 66.1359 98.0742C66.5139 98.6435 66.8927 99.213 67.2707 99.7822V99.7832C67.5953 100.27 67.9481 100.587 68.3195 100.808C68.6809 101.022 69.0469 101.137 69.3527 101.234C69.6707 101.336 69.9296 101.421 70.1779 101.568C70.4162 101.71 70.6601 101.922 70.9035 102.288C71.4595 103.125 71.6986 103.564 71.9416 104.008C72.1923 104.466 72.447 104.931 73.0246 105.801C73.273 106.175 73.3841 106.483 73.4357 106.756C73.489 107.038 73.4843 107.301 73.4758 107.619C73.4676 107.928 73.4556 108.293 73.5315 108.695C73.6091 109.106 73.7736 109.539 74.092 110.019C74.6676 110.885 74.9883 111.303 75.3059 111.715C75.6156 112.117 75.9223 112.513 76.4826 113.352C76.8278 113.868 77.3095 114.221 77.7775 114.488C78.2294 114.746 78.7458 114.962 79.1018 115.135C79.507 115.332 79.714 115.476 79.799 115.606C79.8297 115.653 79.8426 115.698 79.84 115.759C79.837 115.829 79.8101 115.948 79.7111 116.129C79.4798 116.552 79.2701 116.661 79.1018 116.694C78.8891 116.736 78.6099 116.684 78.1867 116.539C77.4159 116.275 76.2407 115.699 74.9289 115.939C74.4118 116.034 73.9323 116.032 73.4738 116.002C73.0495 115.974 72.5419 115.911 72.1379 115.904C71.703 115.897 71.2445 115.946 70.8147 116.189C70.4349 116.405 70.1252 116.744 69.8664 117.222L69.759 117.435C69.4912 118.001 69.4176 118.513 69.5686 118.988C69.7139 119.445 70.041 119.779 70.3654 120.048C70.5305 120.185 70.7115 120.318 70.8879 120.446C71.0678 120.578 71.246 120.707 71.424 120.847C71.7783 121.126 72.1133 121.434 72.3869 121.825C73.0199 122.73 73.366 123.167 73.7082 123.601C74.0438 124.025 74.3763 124.447 74.9943 125.33C75.6416 126.255 76.0497 126.671 76.4465 127.076C76.8224 127.46 77.1884 127.833 77.7902 128.695L77.9826 128.986C78.3828 129.634 78.4681 130.085 78.5627 130.571C78.6826 131.188 78.8149 131.853 79.4982 132.829C80.2288 133.873 81.3263 134.17 81.8899 134.402C82.2192 134.538 82.2822 134.613 82.2951 134.641C82.2984 134.648 82.3491 134.776 82.1213 135.217C81.8873 135.67 81.7436 135.721 81.7209 135.727C81.6884 135.735 81.5957 135.736 81.3068 135.573C80.8038 135.29 79.9319 134.619 78.6809 134.619C77.6162 134.619 77.0887 134.576 76.5539 134.531C76.0039 134.486 75.4455 134.439 74.341 134.439C73.1817 134.44 72.582 134.632 72.0149 134.816C71.497 134.985 71.011 135.145 70.0012 135.145C68.862 135.145 68.2766 135.287 67.7141 135.425C67.1921 135.553 66.6916 135.677 65.6613 135.677C64.6378 135.677 64.1425 135.54 63.6223 135.397C63.0579 135.242 62.4675 135.081 61.3215 135.081C60.1874 135.081 59.6058 135.21 59.0451 135.335C58.522 135.451 58.0189 135.563 56.9856 135.563C55.9598 135.563 55.463 135.436 54.9426 135.303C54.3802 135.159 53.7931 135.01 52.6496 135.01C51.5493 135.01 50.9953 135.045 50.4475 135.08C49.9116 135.114 49.3809 135.148 48.3098 135.148C47.2895 135.148 46.7974 135.005 46.2785 134.855C45.7137 134.693 45.121 134.523 43.9699 134.523C42.7507 134.523 42.1145 134.896 41.5451 135.232C41.0307 135.536 40.5823 135.803 39.6301 135.803C38.6924 135.803 38.2497 135.512 37.7326 135.172C37.1652 134.799 36.5214 134.376 35.2893 134.376C34.0847 134.376 33.4559 134.71 32.8859 135.015C32.3723 135.289 31.9167 135.534 30.9543 135.534C29.9013 135.534 29.3839 135.464 28.8547 135.393C28.3011 135.317 27.7347 135.24 26.6184 135.24C25.5246 135.24 24.9746 135.259 24.4289 135.278C23.8897 135.297 23.3534 135.316 22.2775 135.316C21.2716 135.316 20.7882 135.15 20.2717 134.974C19.7046 134.78 19.1034 134.577 17.9426 134.577C16.8377 134.577 16.2782 134.63 15.7277 134.681C15.1945 134.73 14.669 134.779 13.6066 134.779C12.5137 134.779 11.9639 134.801 11.4182 134.823C10.8801 134.845 10.3452 134.867 9.27071 134.867C8.10509 134.867 7.50067 135.083 6.93282 135.289C6.41694 135.476 5.93648 135.652 4.93477 135.652C4.33069 135.652 3.77587 135.768 3.29024 135.896C2.77237 136.032 2.40634 136.158 2.03243 136.235C1.6758 136.309 1.46148 136.3 1.3127 136.234C1.18192 136.177 1.00657 136.032 0.83907 135.599C0.658632 135.131 0.726289 134.941 0.788289 134.845C0.880211 134.703 1.08548 134.563 1.49532 134.386C2.22757 134.069 3.51262 133.7 4.34005 132.646C5.08014 131.702 5.40749 131.188 5.7297 130.682C6.04192 130.191 6.3499 129.708 7.06368 128.803C7.81952 127.844 8.11016 127.28 8.39083 126.73C8.65569 126.212 8.91106 125.709 9.60958 124.818C10.3611 123.861 10.6558 123.302 10.9416 122.758C11.2123 122.242 11.4747 121.741 12.175 120.849C12.8017 120.05 13.665 119.813 14.4797 119.454C14.8445 119.294 15.288 119.069 15.5217 118.647C15.7772 118.186 15.7066 117.651 15.4494 117.068C15.1964 116.496 14.8832 116.085 14.4543 115.873C14.0233 115.66 13.5774 115.698 13.1877 115.783C12.9908 115.826 12.7871 115.886 12.5891 115.945C12.3859 116.007 12.1855 116.07 11.9709 116.127C11.5466 116.241 11.0915 116.328 10.5832 116.321C9.34824 116.305 8.70362 116.557 8.10177 116.794C7.55487 117.009 7.04811 117.21 5.9963 117.194C5.37666 117.185 4.84736 117.265 4.39766 117.351C3.92508 117.441 3.60462 117.522 3.29903 117.55C3.02013 117.575 2.83416 117.544 2.67012 117.449C2.49572 117.348 2.28164 117.138 2.0295 116.678C1.91652 116.471 1.87891 116.34 1.87032 116.266C1.86351 116.206 1.8752 116.194 1.87618 116.192C1.88461 116.179 1.91652 116.141 2.0168 116.087C2.11706 116.033 2.25222 115.979 2.43282 115.919C3.10332 115.696 4.34837 115.428 5.13497 114.433C5.88692 113.48 5.9874 112.752 6.07637 112.099C6.15686 111.508 6.22606 110.992 6.8127 110.249C7.42187 109.478 7.8706 109.237 8.35958 108.973C8.90219 108.679 9.48502 108.361 10.215 107.437C10.8933 106.578 11.2091 106.124 11.5207 105.674C11.8256 105.234 12.1268 104.797 12.7854 103.961C13.504 103.048 13.7053 102.438 13.8928 101.865C14.063 101.345 14.2204 100.86 14.8361 100.08C15.5214 99.212 15.8134 98.7263 16.0998 98.25C16.3744 97.7934 16.6435 97.3456 17.2932 96.5205C17.8772 95.7788 18.3619 95.594 18.9182 95.3809C19.5336 95.145 20.221 94.8804 20.9719 93.9268C21.2798 93.5357 21.5742 93.2577 21.8381 93.0244C22.0834 92.8076 22.367 92.5779 22.5627 92.3428C22.7873 92.0727 22.9373 91.7546 22.9318 91.333C22.9268 90.9472 22.791 90.5138 22.5578 89.9961C22.3241 89.4772 22.0609 89.0805 21.6897 88.8828C21.285 88.6676 20.886 88.7553 20.5861 88.8545C19.9604 89.0614 19.4212 89.4003 18.465 89.3213H18.4641C17.3292 89.2296 16.7386 89.2969 16.1672 89.3623C15.6305 89.4237 15.1108 89.483 14.0656 89.3965C13.4668 89.347 12.9103 89.4005 12.4133 89.4717C11.8906 89.5466 11.4944 89.6295 11.094 89.666C10.7116 89.7009 10.4242 89.6801 10.1887 89.585C9.96651 89.4951 9.73775 89.3171 9.51387 88.9336C9.29965 88.5665 9.30569 88.3411 9.36055 88.1758C9.42769 87.9739 9.60099 87.7574 9.91231 87.4746C10.0639 87.3369 10.2312 87.1977 10.4172 87.042C10.5996 86.8892 10.7962 86.723 10.9895 86.543C11.3763 86.1826 11.7691 85.7493 12.0481 85.1982C12.5277 84.2508 12.7829 83.7869 13.0393 83.3213C13.2988 82.8499 13.5593 82.3757 14.0441 81.416C14.4909 80.5318 14.8499 80.1814 15.2316 79.8057C15.6513 79.3925 16.0938 78.9536 16.6096 77.9326C17.1247 76.9128 17.2184 76.2968 17.3049 75.7139C17.3837 75.1827 17.4553 74.684 17.9025 73.7988C18.3894 72.8351 18.6086 72.3364 18.8254 71.8428C19.0381 71.3586 19.2492 70.8786 19.7268 69.9395C20.2391 68.9318 20.3581 68.3372 20.4699 67.7695C20.5727 67.2475 20.6691 66.7526 21.1213 65.8594C21.4755 65.1598 21.7182 64.7368 21.9348 64.3799L22.3645 63.6816C22.5904 63.3096 22.8465 62.8643 23.2141 62.1367C23.636 61.3016 24.0649 61.0244 24.5549 60.7061C25.0985 60.3529 25.7038 59.9577 26.2443 58.8877C26.4657 58.4496 26.7125 58.0971 26.9553 57.7764C27.1872 57.4701 27.4521 57.148 27.6477 56.8369C27.8544 56.5081 28.0184 56.1416 28.0539 55.6953C28.0846 55.308 28.0161 54.8968 27.8449 54.4375L27.7649 54.2373C27.5202 53.6577 27.2351 53.2358 26.885 52.9326C26.5317 52.6268 26.1467 52.4719 25.757 52.3721C25.3948 52.2793 24.9563 52.2196 24.5695 52.1465C24.1587 52.0688 23.7164 51.9628 23.2248 51.7617C21.9946 51.2587 20.739 51.6056 19.924 51.7295C19.4771 51.7974 19.1805 51.8037 18.9641 51.7256C18.7907 51.6629 18.598 51.519 18.4367 51.0791C18.2874 50.6715 18.343 50.4671 18.424 50.333C18.5302 50.1575 18.7465 49.9887 19.1223 49.7744C19.4571 49.5835 19.9532 49.3401 20.382 49.0586C20.832 48.7632 21.2876 48.3805 21.6242 47.832C22.2604 46.7953 22.2877 46.0656 22.3107 45.4082C22.3316 44.814 22.349 44.2914 22.8508 43.4756C23.3693 42.6327 23.7896 42.3363 24.2463 42.0117C24.7519 41.6524 25.2948 41.2639 25.9143 40.2568C26.515 39.2801 26.6911 38.695 26.8586 38.1338C27.0134 37.6153 27.16 37.12 27.6975 36.2441C28.2344 35.3693 28.61 35.0165 29.0031 34.6455C29.4292 34.2434 29.8727 33.8225 30.4719 32.8447C30.9776 32.0195 31.6489 31.6644 32.3225 31.1309C32.6432 30.8768 32.9689 30.5708 33.1701 30.1445C33.3768 29.7064 33.4258 29.1983 33.3068 28.585C33.2557 28.3206 33.1637 28.0834 33.0149 27.8877C32.862 27.6868 32.6676 27.5531 32.4533 27.4746C32.0564 27.3294 31.6 27.3784 31.2258 27.4355C30.8009 27.5004 30.4432 27.5827 30.0344 27.6211C29.6459 27.6576 29.3008 27.6409 28.9982 27.5283C28.5575 27.3642 28.1791 27.2814 27.8654 27.2236C27.5316 27.1622 27.3355 27.1365 27.1613 27.0811C27.0187 27.0356 26.9371 26.9824 26.8654 26.8906C26.7809 26.7823 26.682 26.5846 26.5891 26.1973V26.1963C26.3524 25.2123 26.3795 24.803 26.5158 24.4424C26.5919 24.2414 26.7108 24.0326 26.8938 23.7373C27.072 23.4497 27.3038 23.0896 27.5676 22.623C27.7946 22.2214 28.024 21.9751 28.2473 21.7998C28.4775 21.6191 28.7165 21.5011 29.0051 21.3604C29.2853 21.2237 29.6164 21.0642 29.9416 20.8096C30.2736 20.5495 30.5866 20.2021 30.8742 19.6943C31.3998 18.7667 31.6201 18.2708 31.8371 17.7832C32.0469 17.3119 32.2532 16.8483 32.757 15.959C33.2743 15.0459 33.5238 14.5816 33.7717 14.1191C34.0175 13.6606 34.2626 13.2035 34.7746 12.2998C35.3439 11.295 35.3875 10.6251 35.425 10.0127C35.4587 9.46279 35.4864 8.96928 35.9465 8.15723C36.4699 7.2333 36.6982 6.74638 36.9231 6.26562C37.1418 5.79801 37.3576 5.33635 37.8635 4.44336C38.1472 3.94249 38.3298 3.42554 38.4758 2.95508C38.6281 2.46422 38.73 2.06584 38.8703 1.70117C39.0065 1.34736 39.1495 1.11102 39.3293 0.958984C39.496 0.818076 39.7419 0.710063 40.1691 0.709961H40.3908ZM40.5217 62.7422C38.8824 61.4504 36.3772 61.0439 34.4035 62.0332L34.4025 62.0342C32.382 63.05 31.2855 65.3316 31.05 67.5146C30.8143 69.7002 31.4003 72.1714 33.2268 73.5986C35.1554 75.1043 38.0928 75.1287 40.1076 73.8223L40.1096 73.8213C41.9583 72.6173 42.8291 70.4412 42.8908 68.3682C42.9485 66.4265 42.3036 64.3539 40.8283 63.0029L40.5217 62.7422ZM54.5217 62.7422C52.8824 61.4504 50.3771 61.0441 48.4035 62.0332L48.4025 62.0342C46.382 63.0499 45.2856 65.3317 45.05 67.5146C44.8143 69.7002 45.4003 72.1714 47.2268 73.5986C49.1554 75.1043 52.0928 75.1288 54.1076 73.8223L54.1096 73.8213C55.9582 72.6173 56.8291 70.4411 56.8908 68.3682C56.9484 66.4267 56.3034 64.3538 54.8283 63.0029L54.5217 62.7422Z" fill="#FCFCFC"/>
        <g transform={`translate(${off.x} ${off.y})`}>
          <path d="M37.5162 69.9652C38.4746 70.1582 39.3911 69.6462 39.8933 69.0545C40.8517 67.9171 40.5797 66.1797 39.7845 65.1808C39.6297 64.9836 38.9307 64.1106 37.8761 64.1484C37.0893 64.1778 36.5619 64.7024 36.4071 64.8577C35.3566 65.9069 35.1976 67.8961 36.1392 69.0796C36.2732 69.2475 36.7294 69.8057 37.5162 69.961V69.9652Z" fill="#FCFCFC" stroke="#FCFCFC" strokeWidth="2" strokeLinejoin="round"/>
        </g>
        <g transform={`translate(${off.x} ${off.y})`}>
          <path d="M48.9986 69.9652C49.957 70.1582 50.8735 69.6462 51.3758 69.0545C52.3342 67.9171 52.0621 66.1797 51.2669 65.1808C51.1121 64.9836 50.4132 64.1106 49.3585 64.1484C48.5717 64.1778 48.0444 64.7024 47.8895 64.8577C46.839 65.9069 46.68 67.8961 47.6217 69.0796C47.7556 69.2475 48.2118 69.8057 48.9986 69.961V69.9652Z" fill="#FCFCFC" stroke="#FCFCFC" strokeWidth="2" strokeLinejoin="round"/>
        </g>
      </g>
      <defs>
        <clipPath id="treeClip">
          <rect width="83" height="137" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

// ═════════ HOME ═════════
function HomePage({ navigate, onAddToCart, openProduct, treesPlanted }) {
  const [seenRef, seen] = useInView();
  return (
    <div data-screen-label="01 Home" style={{ padding: "0px", textAlign: "left" }}>
      {/* HERO */}
      <section
        className="gh-hero"
        style={{
          maxWidth: 1280, margin: "0 auto",

          display: "grid",
          gap: "clamp(32px, 5vw, 64px)",
          alignItems: "center",
          minHeight: "80vh",
          gridTemplateColumns: "1fr", padding: "172px var(--page-px) 64px"
        }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "fadeUp .6s ease both" }}>
          <h1 style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 400,
            lineHeight: "56px",
            letterSpacing: "-0.04em",
          }}>
            Small Art, Big <span style={{ color: "var(--coral)" }}>Hearts</span>.
          </h1>
          <p style={{ margin: 0, fontSize: 20, color: "var(--ink-3)", maxWidth: 460, lineHeight: "24px" }}>
            Submit a sketch. We turn it into a sticker.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
            <Button variant="coral" size="lg" onClick={() => navigate("upload")}>Upload art</Button>
          </div>
        </div>

        {/* Booth illustration */}
        <div style={{
          maxWidth: 560,
          margin: "0 auto",
          width: "100%"
        }}>
          <img src="assets/booth.svg" alt="Goody Hearts Club booth" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </section>

      {/* IMPACT BLOCK */}
      <section ref={seenRef} style={{ background: "#000", color: "#fff", padding: "96px 0", textAlign: "left", position: "relative", overflow: "hidden" }}>
        {/* Video background */}
        <video
          autoPlay loop muted playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 0.10,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        >
          <source src="assets/A_black_and_white_animation_fe_Kling_30__74080.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "relative", zIndex: 1 }} />{/* lift content above video */}
        <div className="gh-impact-grid" style={{
          maxWidth: 1280, margin: "0 auto",
          display: "grid",
          gap: "clamp(32px, 6vw, 64px)",
          alignItems: "center",
          gridTemplateColumns: "1fr 1fr",
          padding: "0 var(--page-px)"
        }}>
          <div>
            <span style={{ fontSize: 13, color: "var(--coral)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>Together</span>
            <h2 style={{ margin: "12px 0 24px", fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em", textWrap: "balance" }}>
              We've planted
            </h2>
            <span style={{ display: "inline-flex", alignItems: "baseline", gap: 12, color: "var(--coral)" }}>
              <TreeCounter target={treesPlanted} trigger={seen} large />
            </span>
            <p style={{ marginTop: 24, color: "rgba(255,255,255,.7)", fontSize: 17, maxWidth: 480, lineHeight: 1.55 }}>
              Each tree is planted by our partner forestry team in the Pacific Northwest. We post photos every quarter — the trees, the people, the receipts.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TreeEyes />
          </div>
        </div>
      </section>

      {/* Sticker Gallery */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px var(--page-px) 96px", overflow: "hidden" }}>
        <SectionHeader eyebrow="Sticker collection" title="Our artwork." subtitle="Every sticker is made from art submitted by independent artists." />
        <div className="gh-grid" style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(3, 1fr)", marginTop: 48 }}>
          {STICKER_KEYS.map((id, i) => {
            const s = STICKERS[id];
            return (
              <div key={id} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                animation: "fadeUp .5s ease both", animationDelay: `${i * 60}ms`
              }}>
                <div style={{
                  width: "100%", aspectRatio: "1 / 1",
                  background: "linear-gradient(180deg, #FAFAF7 0%, #F2F0EB 100%)",
                  borderRadius: 16, overflow: "hidden",
                  display: "grid", placeItems: "center",
                  padding: 24,
                }}>
                  <div style={{ animation: "drift 6s ease-in-out infinite", animationDelay: `${i * 0.4}s` }}>
                    <StickerArt id={id} size={180} rotate={i % 2 ? 3 : -3} />
                  </div>
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.02em", textAlign: "center" }}>{s.name}</span>
              </div>
            );
          })}
        </div>
      </section>

    </div>);

}

// ═════════ SHOP ═════════
function ShopPage({ onAddToCart, openProduct }) {
  return (
    <div data-screen-label="02 Shop">
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px var(--page-px) 96px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <SectionHeader eyebrow="The shop" title="Stickers, all $3 ish" subtitle="Eight tiny artworks, packed and shipped within 48 hours." />
          <span style={{ fontSize: 14, color: "var(--ink-3)" }}>Showing {STICKER_KEYS.length} stickers</span>
        </div>

        <div className="gh-grid" style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(3, 1fr)" }}>
          {STICKER_KEYS.map((id, i) => {
            const s = STICKERS[id];
            return (
              <article
                key={id}
                onClick={() => openProduct(id)}
                style={{
                  background: "#fff", borderRadius: 12, overflow: "hidden",
                  border: "1px solid var(--hairline)",
                  display: "flex", flexDirection: "column",
                  cursor: "pointer", transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                  animation: "fadeUp .5s ease both", animationDelay: `${i * 60}ms`
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px -8px rgba(0,0,0,.14)"; e.currentTarget.style.borderColor = "var(--hairline)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--hairline)"; }}>

                <div style={{
                  background: "linear-gradient(180deg, #FAFAF7 0%, #F2F0EB 100%)",
                  aspectRatio: "1 / 1", display: "grid", placeItems: "center",
                  padding: 24, position: "relative"
                }}>
                  <div style={{ animation: "drift 6s ease-in-out infinite" }}><StickerArt id={id} size={170} rotate={i % 2 ? 4 : -4} /></div>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6, borderTop: "1px solid var(--hairline)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.03em" }}>{s.name}</span>
                    <span style={{ fontSize: 16, color: "var(--ink-2)", fontWeight: 500 }}>${s.price.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                    <span style={{ fontSize: 13, color: "var(--forest)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <IconLeaf size={14} /> {s.trees} trees planted
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onAddToCart(id, 1); }}
                      aria-label={`Add ${s.name} to bag`}
                      style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: "var(--ink)", color: "#fff", border: 0,
                        display: "grid", placeItems: "center",
                        transition: "background .15s ease, transform .15s ease"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--coral)"; e.currentTarget.style.transform = "scale(1.08)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "none"; }}>
                      <IconPlus size={18} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ═════════ PRODUCT ═════════
function ProductPage({ id, onAddToCart, openProduct, navigate }) {
  const sticker = STICKERS[id] || STICKERS.petal;
  const { Comp, name, price, color, trees, blurb } = sticker;
  const [tab, setTab] = uS("Description");
  const [qty, setQty] = uS(1);
  const [size, setSize] = uS("3 in");
  const [adding, setAdding] = uS(false);
  const sizes = ["2 in", "3 in", "4 in"];
  const more = STICKER_KEYS.filter((k) => k !== id).slice(0, 4);

  uE(() => {window.scrollTo({ top: 0, behavior: "instant" });}, [id]);

  const handleAdd = () => {
    setAdding(true);
    onAddToCart(id, qty);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <div data-screen-label="02 Product">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px clamp(20px, 4vw, 48px) 0" }}>
        <Button variant="link" icon={<IconArrowL size={16} />} onClick={() => navigate("home")}>Back</Button>
      </div>

      <section style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "16px clamp(20px, 4vw, 48px) 64px",
        display: "grid", gap: "clamp(32px, 5vw, 64px)",
        gridTemplateColumns: "1fr",
        alignItems: "start"
      }} className="gh-product">
        {/* Visual */}
        <div>
          <div style={{
            background: "linear-gradient(180deg, " + color + "11 0%, " + color + "22 100%)",
            borderRadius: 24,
            aspectRatio: "1 / 1",
            display: "grid", placeItems: "center",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ animation: "drift 5s ease-in-out infinite" }}>
              <Comp size={Math.min(360, 360)} rotate={-4} />
            </div>
            <span style={{
              position: "absolute", top: 16, left: 16,
              background: "var(--forest)", color: "#fff",
              padding: "6px 12px", borderRadius: "var(--radius-pill)",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.04em",
              display: "inline-flex", alignItems: "center", gap: 6
            }}>
              <IconLeaf size={14} /> {trees} trees planted
            </span>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "center" }}>
            {[0, 1, 2].map((i) =>
            <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "var(--ink)" : "var(--ink-5)" }} />
            )}
          </div>
        </div>

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <span style={{ fontSize: 13, color: "var(--forest)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <IconLeaf size={14} /> {trees} trees planted with this sticker
            </span>
            <h1 style={{ margin: "8px 0 0", fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>{name}</h1>
            <div style={{ marginTop: 12, fontSize: 22, fontWeight: 500, color: "var(--ink-2)" }}>${price.toFixed(2)}</div>
          </div>

          {/* Tabs */}
          <div>
            <div style={{ display: "flex", gap: 24, borderBottom: "1px solid var(--hairline)", marginBottom: 16 }}>
              {["Description", "Size", "Ratings"].map((t) =>
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: "transparent", border: 0,
                  padding: "10px 0",
                  fontSize: 15, fontWeight: 500,
                  color: tab === t ? "var(--ink)" : "var(--ink-3)",
                  borderBottom: tab === t ? "2px solid var(--coral)" : "2px solid transparent",
                  marginBottom: -1, cursor: "pointer"
                }}>
                {t}</button>
              )}
            </div>
            <div style={{ minHeight: 64, color: "var(--ink-2)", fontSize: 15, lineHeight: 1.6 }}>
              {tab === "Description" && <p style={{ margin: 0 }}>{blurb}</p>}
              {tab === "Size" &&
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {sizes.map((s) =>
                <button key={s} onClick={() => setSize(s)} style={{
                  padding: "10px 18px", borderRadius: "var(--radius-pill)",
                  border: "1px solid " + (size === s ? "var(--ink)" : "var(--hairline)"),
                  background: size === s ? "var(--ink)" : "var(--surface)",
                  color: size === s ? "#fff" : "var(--ink-2)",
                  fontSize: 14, cursor: "pointer", transition: "all .15s ease"
                }}>{s}</button>
                )}
                </div>
              }
              {tab === "Ratings" &&
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "inline-flex", gap: 2, color: "var(--coral)" }}>
                    {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} size={20} fill={i < 5 ? "var(--coral)" : "none"} stroke="var(--coral)" />)}
                  </div>
                  <span style={{ fontWeight: 600 }}>4.9</span>
                  <span style={{ color: "var(--ink-3)" }}>· 312 reviews</span>
                </div>
              }
            </div>
          </div>

          {/* Quantity + Add */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            <QtyStepper value={qty} onChange={setQty} size="lg" />
            <Button
              variant="coral" size="lg"
              icon={adding ? <IconCheck size={18} /> : <IconCart size={18} />}
              onClick={handleAdd}
              style={{ minWidth: 200, transform: adding ? "scale(.98)" : "none" }}>
              
              {adding ? "Added!" : "Add to Bag"}
            </Button>
          </div>

          <div style={{ background: "var(--mint)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, color: "var(--forest-d)" }}>
            <IconLeaf size={20} />
            <span style={{ fontSize: 14, lineHeight: 1.4 }}>
              Buying {qty}? We'll plant <strong>{qty}</strong> tree{qty === 1 ? "" : "s"} in the Pacific Northwest.
            </span>
          </div>

          {/* Shipping accordion */}
          <ShippingAccordion />
        </div>
      </section>

      {/* More for you */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px) 64px" }}>
        <SectionHeader eyebrow="Pairs well with" title="More for you" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
          {more.map((mid) => {
            const m = STICKERS[mid];
            return (
              <article key={mid} onClick={() => openProduct(mid)} style={{
                background: "#fff", borderRadius: 12, overflow: "hidden", cursor: "pointer",
                border: "1px solid var(--hairline)",
                transition: "transform .25s ease, border-color .25s ease"
              }}
              onMouseEnter={(e) => {e.currentTarget.style.transform = "translateY(-3px)";e.currentTarget.style.borderColor = "var(--coral)";}}
              onMouseLeave={(e) => {e.currentTarget.style.transform = "none";e.currentTarget.style.borderColor = "var(--hairline)";}}>
                
                <div style={{ aspectRatio: "1/1", background: "linear-gradient(180deg,#FAFAF7,#F2F0EB)", display: "grid", placeItems: "center", padding: 16 }}>
                  <StickerArt id={mid} size={130} rotate={3} />
                </div>
                <div style={{ padding: 12, borderTop: "1px solid var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>{m.name}</span>
                  <span style={{ fontSize: 14, color: "var(--ink-2)" }}>${m.price.toFixed(2)}</span>
                </div>
              </article>);

          })}
        </div>
      </section>
    </div>);

}

function ShippingAccordion() {
  const [open, setOpen] = uS(false);
  return (
    <div style={{ borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "transparent", border: 0, padding: "16px 0", fontSize: 18, fontFamily: "var(--font-display)",
        letterSpacing: "-0.03em", color: "var(--ink)"
      }}>
        Shipping and Returns
        <IconPlus size={18} style={{ transition: "transform .25s", transform: open ? "rotate(45deg)" : "none" }} />
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? 200 : 0,
        transition: "max-height .3s ease"
      }}>
        <p style={{ margin: 0, padding: "0 0 16px", color: "var(--ink-3)", fontSize: 14, lineHeight: 1.6 }}>
          Ships within 48 hours from Seattle. Free shipping over $20. Returns accepted within 30 days for any unopened sticker — though we hope you'll keep them.
        </p>
      </div>
    </div>);

}

// ═════════ ABOUT ═════════
function AboutPage({ navigate, treesPlanted }) {
  const [seenRef, seen] = useInView();
  return (
    <div data-screen-label="03 About">
      {/* Hero */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(40px, 8vw, 96px) clamp(20px, 4vw, 48px)", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--coral)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>Our story</span>
        <h1 style={{
          margin: "16px 0 24px",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(44px, 8vw, 96px)", lineHeight: .98, letterSpacing: "-0.04em", textWrap: "balance"
        }}>
          A sticker is a <span style={{ color: "var(--coral)" }}>tiny manifesto</span>.
        </h1>
        <p style={{ margin: "0 auto", maxWidth: 640, color: "var(--ink-3)", fontSize: 19, lineHeight: 1.55 }}>
          We started Goody Hearts Club because the world has plenty of swag and not enough good. We work with artists, plant trees, and ship the result in a paper envelope.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 48, flexWrap: "wrap" }}>
          <div style={{ animation: "wiggle 4s ease-in-out infinite" }}><StickerArt id="tree" size={140} rotate={-6} /></div>
          <div style={{ animation: "wiggle 5s ease-in-out infinite", animationDelay: ".4s" }}><StickerArt id="heart" size={140} rotate={4} /></div>
          <div style={{ animation: "wiggle 6s ease-in-out infinite", animationDelay: ".8s" }}><StickerArt id="star" size={140} rotate={-4} /></div>
        </div>
      </section>

      {/* Impact stats */}
      <section ref={seenRef} style={{ background: "#000", color: "#fff", padding: "clamp(48px, 8vw, 96px) clamp(20px, 4vw, 48px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
          {[
          { v: treesPlanted, l: "Trees planted", c: "var(--coral)" },
          { v: treesPlanted, l: "Stickers sold", c: "#fff" },
          { v: 7, l: "Artists onboard", c: "var(--coral)" },
          { v: 0, l: "Forest acres reached", c: "#fff" }].
          map((s, i) =>
          <div key={i}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 96px)", color: s.c, letterSpacing: "-0.04em", lineHeight: 1 }}>
                <TreeCounter target={s.v} label="" trigger={seen} />
              </div>
              <div style={{ marginTop: 8, color: "rgba(255,255,255,.7)", fontSize: 15 }}>{s.l}</div>
            </div>
          )}
        </div>
      </section>

      {/* One Tree Planted */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px clamp(20px, 4vw, 48px) 0", display: "flex", justifyContent: "center" }}>
        <a
          href="https://onetreeplanted.org"
          target="_blank"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--coral)", color: "#fff",
            padding: "12px 24px", borderRadius: "var(--radius-pill)",
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            transition: "opacity .15s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = ".85"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          <IconLeaf size={16} /> One Tree Planted — our planting partner ↗
        </a>
      </div>

      {/* How it works */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) clamp(20px, 4vw, 48px)" }}>
        <SectionHeader eyebrow="How it works" title="The whole loop." align="center" />
        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
          { n: "01", t: "An artist submits", d: "A sketch, a doodle, a watercolor. We accept anything that makes us smile." },
          { n: "02", t: "We make stickers", d: "We die-cut, package, and add them to the shop. Artists get a cut of each sale." },
          { n: "03", t: "You buy one", d: "You buy one sticker with $1. We pack it within 48 hours and ship it from Seattle, USPS." },
          { n: "04", t: "A tree gets planted", d: "Our forestry partner plants one tree per sticker, photographed quarterly." }].
          map((s) =>
          <div key={s.n} style={{
            padding: 24, borderRadius: 16,
            border: "1px solid var(--hairline)", background: "var(--surface)",
            display: "flex", flexDirection: "column", gap: 8
          }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--coral)", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.n}</span>
              <span style={{ fontWeight: 600, fontSize: 18 }}>{s.t}</span>
              <span style={{ color: "var(--ink-3)", fontSize: 15, lineHeight: 1.5 }}>{s.d}</span>
            </div>
          )}
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px) clamp(48px, 8vw, 96px)" }}>
        <SectionHeader eyebrow="The team" title="Meet the club." align="center" />
        <div style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginTop: 48 }}>
          {[
            { name: "Sauhee Han",  role: "Club President & PM",    img: "assets/SauheeHan.jpeg",  url: "https://www.linkedin.com/in/shannon-sauhee-han-451101194/" },
            { name: "Peggy",       role: "Social Media Manager",   img: "assets/Peggy.jpeg",   url: "https://www.linkedin.com/in/peggyshen/" },
            { name: "Prerna",      role: "Website Designer",       img: "assets/Prerna.png",   url: "https://www.linkedin.com/in/prernaakashyap/" },
            { name: "June Cho",    role: "Website Developer",      img: "assets/Yun.JPG",      url: "https://www.linkedin.com/in/junecho02/" },
          ].map(({ name, role, img, url }) => (
            <a key={name} href={url} target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
              <div>
                <div
                  style={{ aspectRatio: "1 / 1", overflow: "hidden", background: "var(--hairline)", transition: "box-shadow .2s ease, transform .2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 16px 40px -8px rgba(0,0,0,.18)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ paddingTop: 14 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.02em" }}>{name}</div>
                  <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 4 }}>{role}</div>
                  <div style={{ fontSize: 13, color: "var(--coral)", marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    LinkedIn ↗
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px) clamp(48px, 8vw, 96px)" }}>
        <div style={{
          background: "var(--cream)", borderRadius: 24, padding: "clamp(32px, 5vw, 56px)",
          display: "grid", gap: 32, gridTemplateColumns: "1fr", alignItems: "center"
        }}>
          <div>
            <span style={{ fontSize: 13, color: "var(--coral)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>Reach out</span>
            <h2 style={{ margin: "12px 0", fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              Say hi, send a doodle, or pitch a tree.
            </h2>
            <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 16, lineHeight: 1.55 }}>
              We read every email. Promise.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button variant="primary" size="lg">hello@goodyhearts.club</Button>
              <Button variant="outline" size="lg" onClick={() => navigate("upload")}>Upload art</Button>
            </div>
          </div>
        </div>
      </section>
    </div>);

}

// ═════════ GALLERY ═════════
function GalleryPage() {
  return (
    <div data-screen-label="Gallery">
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px var(--page-px) 96px", overflow: "hidden" }}>
        <SectionHeader eyebrow="Sticker collection" title="Our artwork." subtitle="Every sticker is made from art submitted by independent artists." />
        <div className="gh-grid" style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(3, 1fr)", marginTop: 48 }}>
          {STICKER_KEYS.map((id, i) => {
            const s = STICKERS[id];
            return (
              <div key={id} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                animation: "fadeUp .5s ease both", animationDelay: `${i * 60}ms`
              }}>
                <div style={{
                  width: "100%", aspectRatio: "1 / 1",
                  background: "linear-gradient(180deg, #FAFAF7 0%, #F2F0EB 100%)",
                  borderRadius: 16, overflow: "hidden",
                  display: "grid", placeItems: "center",
                  padding: 24,
                }}>
                  <div style={{ animation: "drift 6s ease-in-out infinite", animationDelay: `${i * 0.4}s` }}>
                    <StickerArt id={id} size={180} rotate={i % 2 ? 3 : -3} />
                  </div>
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.02em", textAlign: "center" }}>{s.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwxBuuL5a_IQbSUHnAzxrbBkm5uq-p_nE_EvnnxurxnfTAITO9q42Ug1Y2sWnYcqzUC_Q/exec";

// ═════════ UPLOAD ART ═════════
function UploadPage({ navigate }) {
  const [file, setFile] = uS(null);
  const [preview, setPreview] = uS(null);
  const [drag, setDrag] = uS(false);
  const [submitted, setSubmitted] = uS(false);
  const [sending, setSending] = uS(false);

  const [fields, setFields] = uS({ name: "", email: "", title: "", instagram: "", tiktok: "", behance: "", note: "" });
  const [fileError, setFileError] = uS(false);
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setFileError(false);
    if (f.type && f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  if (submitted) {
    const bodyStyle = { fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, margin: "0 0 16px" };
    return (
      <div data-screen-label="Upload Success" style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(40px, 6vw, 80px) clamp(20px, 4vw, 48px) clamp(48px, 8vw, 96px)" }}>
        <div style={{ animation: "pop .5s ease both", display: "inline-block", marginBottom: 32 }}>
          <StickerArt id="heart" size={80} rotate={-6} />
        </div>

        <h2 style={{ margin: "0 0 24px", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 40px)", letterSpacing: "-0.03em" }}>Hey Artist,</h2>

        <p style={bodyStyle}>
          Your art just landed in our inbox — thank you for trusting us with it! We're so excited to take a look.
        </p>
        <p style={bodyStyle}>
          Here's what happens from here:<br />
          Our team reviews every submission within a week.
        </p>

        <ul style={{ padding: "0 0 0 20px", margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          <li style={{ ...bodyStyle, margin: 0 }}>To keep our little community in line with the values we care about, we take our time reading every submission with care.</li>
          <li style={{ ...bodyStyle, margin: 0 }}>If it's a yes, you will see it on the website gallery within the week (no fine print, no pressure).</li>
          <li style={{ ...bodyStyle, margin: 0 }}>If you ever want us to remove your art as a sticker, please email us at <a href="mailto:goodyheartsclub@gmail.com" style={{ color: "var(--coral)", textDecoration: "underline" }}>goodyheartsclub@gmail.com</a> using the email you submitted this form with.</li>
        </ul>

        <p style={bodyStyle}>In the meantime, feel free to doodle more. The world can always use it.</p>

        <p style={{ ...bodyStyle, marginTop: 32, marginBottom: 4 }}>Talk soon,</p>
        <p style={{ margin: "0 0 40px", fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 32px)", letterSpacing: "-0.03em" }}>The Goody Hearts Club &lt;3</p>

        <Button variant="coral" size="lg" onClick={() => { setSubmitted(false); setFile(null); setPreview(null); setFields({ name: "", email: "", title: "", instagram: "", tiktok: "", behance: "", note: "" }); }}>Submit another piece</Button>
      </div>);

  }

  return (
    <div data-screen-label="04 Upload" style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(40px, 6vw, 80px) clamp(20px, 4vw, 48px) clamp(48px, 8vw, 96px)" }}>
      <img src="assets/doodle.png" alt="" style={{ width: 200, height: "auto", marginBottom: 24, display: "block", margin: "0 auto 24px" }} />
      <SectionHeader eyebrow="Upload Art" title="Send us your doodle." subtitle="We accept hand-drawn sketches, vectors, watercolors — anything under 10 MB. If we pick it, you get paid per sale and a tree in your name." />

      <form onSubmit={async (e) => {
        e.preventDefault();
        if (!file) { setFileError(true); return; }
        setSending(true);
        try {
          const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          await fetch(SHEET_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
              ...fields,
              fileName: file.name,
              mimeType: file.type || "application/octet-stream",
              fileData: base64,
            }),
          });
        } catch (err) { console.error("Submit error:", err); }
        setSending(false);
        setSubmitted(true);
      }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Field label="Your name/nickname" required>
          <Input required placeholder="Jane Sketcher" value={fields.name} onChange={set("name")} />
        </Field>
        <Field label="Email" required>
          <Input type="email" required placeholder="you@email.com" value={fields.email} onChange={set("email")} />
        </Field>
        <Field label="Title for the piece">
          <Input placeholder="Petal Pop, etc." value={fields.title} onChange={set("title")} />
        </Field>

        {/* Dropzone */}
        <Field label="Your art" required hint={file ? `Selected: ${file.name} (${(file.size / 1024).toFixed(0)} KB)` : fileError ? "Please attach your artwork before submitting." : "PNG, JPG, SVG, or PDF · up to 10 MB"}>
          <label
            htmlFor="gh-file-input"
            onDragOver={(e) => {e.preventDefault();setDrag(true);}}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}
            style={{
              border: "2px dashed " + (drag ? "var(--coral)" : fileError ? "var(--coral)" : "var(--ink-5)"),
              background: drag ? "var(--coral-tint)" : fileError ? "var(--coral-tint)" : "var(--surface)",
              borderRadius: "50%",
              width: 173, height: 173,
              margin: "0 auto",
              display: "grid", placeItems: "center", textAlign: "center",
              cursor: "pointer", transition: "all .15s ease",
              overflow: "hidden", position: "relative",
            }}>

            {preview ?
            <img src={preview} alt="Preview" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /> :
            file ?
            <IconCheck size={36} stroke="var(--forest)" /> :
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "var(--ink-3)" }}>
                <IconUpload size={28} />
                <div style={{ fontSize: 13, color: "var(--ink-2)", fontWeight: 500, lineHeight: 1.3 }}>Drop here<br/>or browse</div>
              </div>
            }

            <input
              id="gh-file-input"
              type="file" accept="image/*,.pdf,.svg"
              style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])} />
          </label>
        </Field>

        <Field label="Social media" hint="Optional — so we can tag you when your sticker drops">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { img: "assets/instagram.png", placeholder: "@yourhandle", label: "Instagram", key: "instagram" },
              { img: "assets/tiktok.svg", placeholder: "@yourhandle", label: "TikTok", key: "tiktok" },
              { img: "assets/Behance logo.svg", placeholder: "yourname", label: "Behance", key: "behance" },
            ].map(({ img, text, placeholder, label, key }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "var(--hairline)", display: "grid", placeItems: "center",
                  flexShrink: 0, overflow: "hidden"
                }}>
                  {img
                    ? <img src={img} alt={label} style={{ width: 20, height: 20, objectFit: "contain" }} />
                    : <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-3)", letterSpacing: "0.04em" }}>{text}</span>
                  }
                </div>
                <Input placeholder={placeholder} aria-label={label} value={fields[key]} onChange={set(key)} style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </Field>

        <Field label="Tell us about it">
          <Textarea placeholder="What were you thinking? Where'd it come from?" rows={3} value={fields.note} onChange={set("note")} />
        </Field>

        <div className="gh-form-actions" style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
          <Button variant="outline" size="lg" type="button" onClick={() => navigate("home")}>Cancel</Button>
          <Button variant="coral" size="lg" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Submit for review"}
          </Button>
        </div>
      </form>
    </div>);

}

// ═════════ VENMO SHEET ═════════
function VenmoSheet({ open, onClose, items, onComplete }) {
  const [stage, setStage] = uS("idle"); // idle | confirmed
  const [fulfillment, setFulfillment] = uS("delivery");
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = fulfillment === "pickup" ? 0 : subtotal > 20 ? 0 : 3;
  const total = subtotal + shipping;
  const trees = items.reduce((s, it) => s + it.qty, 0);

  uE(() => {
    if (open) { setStage("idle"); setFulfillment("delivery"); }
  }, [open]);

  if (!open) return null;

  const receiptRow = (label, value, opts = {}) => (
    <div key={label} style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontSize: opts.bold ? 15 : 13,
      fontWeight: opts.bold ? 700 : 400,
      color: opts.muted ? "var(--ink-4)" : "var(--ink)",
      padding: "5px 0",
    }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px 16px",
      animation: "fadeIn .2s ease both"
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 400,
        background: "#FFFDF7",
        borderRadius: 16,
        boxShadow: "0 24px 64px rgba(0,0,0,.22)",
        animation: "fadeUp .3s cubic-bezier(.2,.7,.2,1) both",
        overflow: "hidden",
        fontFamily: "var(--font-body)",
      }}>

        {/* Receipt header */}
        <div style={{ background: "var(--ink)", color: "#fff", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: .6, marginBottom: 2 }}>Order receipt</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>Goody Hearts Club</div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: 0, color: "rgba(255,255,255,.5)", cursor: "pointer", padding: 4 }}>
            <IconClose size={20} />
          </button>
        </div>

        {/* Perforation */}
        <div style={{ height: 12, background: "repeating-linear-gradient(90deg, #FFFDF7 0px, #FFFDF7 10px, transparent 10px, transparent 18px)", borderTop: "2px dashed #E0DDD4" }} />

        <div style={{ padding: "16px 24px 24px" }}>
          {stage === "confirmed" ? (
            <div style={{ textAlign: "center", padding: "32px 16px" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🌱</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 8 }}>We got it!</div>
              <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.6, margin: "0 0 20px" }}>
                We'll confirm your payment within <strong>12 hours</strong> and send you a shipping update by email. {trees} tree{trees === 1 ? "" : "s"} will be planted with your order.
              </p>
              <button onClick={onComplete} style={{
                background: "var(--coral)", color: "#fff", border: 0,
                borderRadius: "var(--radius-pill)", padding: "12px 28px",
                fontSize: 15, fontWeight: 600, cursor: "pointer"
              }}>Back to shop</button>
            </div>
          ) : (
            <>
              {/* Order lines */}
              <div style={{ marginBottom: 12 }}>
                {items.map(it => receiptRow(
                  `${STICKERS[it.id]?.name ?? it.id} × ${it.qty}`,
                  "$" + (it.price * it.qty).toFixed(2)
                ))}
              </div>
              <div style={{ borderTop: "1px dashed #D8D4C8", paddingTop: 10, marginBottom: 16 }}>
                {receiptRow("Subtotal", "$" + subtotal.toFixed(2), { muted: true })}
                {receiptRow("Shipping", fulfillment === "pickup" ? "Free (pickup)" : shipping === 0 ? "Free" : "$" + shipping.toFixed(2), { muted: true })}
                {receiptRow("TOTAL", "$" + total.toFixed(2), { bold: true })}
              </div>

              {/* Fulfillment */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 10 }}>How do you want it?</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[["delivery", "📦 Delivery"], ["pickup", "🏪 Local pickup"]].map(([val, lbl]) => (
                    <button key={val} onClick={() => setFulfillment(val)} style={{
                      flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 13, fontWeight: 500,
                      border: "1.5px solid " + (fulfillment === val ? "var(--coral)" : "var(--hairline)"),
                      background: fulfillment === val ? "var(--coral-tint)" : "#fff",
                      color: fulfillment === val ? "var(--coral)" : "var(--ink-3)",
                      cursor: "pointer", transition: "all .15s ease"
                    }}>{lbl}</button>
                  ))}
                </div>
                {fulfillment === "pickup" && (
                  <p style={{ fontSize: 12, color: "var(--ink-4)", margin: "8px 0 0", lineHeight: 1.5 }}>
                    Pick up at our Seattle studio — we'll DM you the address after payment.
                  </p>
                )}
              </div>

              {/* Venmo */}
              <div style={{ background: "#EEF4FF", borderRadius: 12, padding: "14px 16px", marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5B87E0", marginBottom: 6 }}>Send on Venmo</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#3D7BE8", letterSpacing: "-0.02em" }}>@GoodyHeartsClub</div>
                <div style={{ fontSize: 12, color: "#7BA3E8", marginTop: 4 }}>Amount: <strong>${total.toFixed(2)}</strong> · note: your order</div>
              </div>

              <button onClick={() => setStage("confirmed")} style={{
                width: "100%", padding: "15px", borderRadius: 12,
                background: "var(--ink)", color: "#fff", border: 0,
                fontSize: 16, fontWeight: 600, cursor: "pointer",
                transition: "opacity .15s"
              }}>
                I sent the money on Venmo ✓
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, ShopPage, ProductPage, AboutPage, UploadPage, VenmoSheet, GalleryPage });