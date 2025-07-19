import { IconsState, Room } from "@/types/types";
import { ComfortsBlock } from "@/components/Room/ComfotsBlock";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "@/components/Room/styles.css";

type ComfortsBlockToProps = {
  icons?: IconsState;
  room?: Room;
  setIsLastComfortBlockSection: (isLast: boolean) => void;
};

export const ComfortsBlocksWrapper = ({
  icons,
  room,
  setIsLastComfortBlockSection
}: ComfortsBlockToProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastBlockRef = useRef<HTMLDivElement | null>(null);
  const [hasShownLastBlock, setHasShownLastBlock] = useState(false);
  const lastScrollTop = useRef<number>(0);
  const lastScrollPosition = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollDistance = useRef(0);
  const isScrollingContainer = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasScrolledToComponent = useRef(false);
  const isMobile = window.innerWidth < 768;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    setHasShownLastBlock(false);
    lastScrollTop.current = 0;
    lastScrollPosition.current = 0;
    scrollDistance.current = 0;
    isScrollingContainer.current = false;
    hasScrolledToComponent.current = false;
    
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    
    blocksRefs.current.forEach(block => {
      if (block) {
        block.style.transform = '';
      }
    });
    
    setIsLastComfortBlockSection(false);
    
  }, [location.pathname, setIsLastComfortBlockSection]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting && !hasScrolledToComponent.current) {
          setTimeout(() => {
            const rect = entry.target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = rect.top + scrollTop - 100;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            hasScrolledToComponent.current = true;
            
            setTimeout(() => {
              hasScrolledToComponent.current = false;
            }, 3000);
          }, 300);
        }
      },
      { threshold: 0.2 }
    );
    setTimeout(() => {
      if (wrapperRef.current && !isMobile) {
        observer.observe(wrapperRef.current);
      }
    }, 1000);
    
    return () => {
      if (wrapperRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(wrapperRef.current);
      }
    };
  }, [isMobile]);

  const setLastComfortSection = useCallback((value: boolean) => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    if (isSafari && value) {
      setIsLastComfortBlockSection(true);
      setHasShownLastBlock(true);
      return;
    }
    
    scrollTimeout.current = setTimeout(() => {
      setIsLastComfortBlockSection(value);
      if (value) {
        setHasShownLastBlock(true);
      } else if (!value && hasShownLastBlock) {
        if (scrollDistance.current > 100) {
          setHasShownLastBlock(false);
        }
      }
    }, 150);
  }, [setIsLastComfortBlockSection, hasShownLastBlock, isSafari]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.style.scrollBehavior = 'smooth';
    const blocks = blocksRefs.current.filter(Boolean);
    if (blocks.length === 0) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      isScrollingContainer.current = true;
      
      if (scrollTop < lastScrollTop.current) {
        setLastComfortSection(false);
      }
      
      else if (scrollTop > lastScrollTop.current) {
        const threshold = isSafari ? 50 : 10;
        const isAtBottom = 
          Math.abs((container.scrollHeight - container.scrollTop) - container.clientHeight) < threshold;
        
        const isNearBottom = isSafari ? 
          (scrollTop / (container.scrollHeight - container.clientHeight)) > 0.9 : false;
        
        if (isAtBottom || isNearBottom) {
          setLastComfortSection(true);
          
          if (isSafari) {
            requestAnimationFrame(() => {
              setLastComfortSection(true);
            });
          }
        }
      }
      
      lastScrollTop.current = scrollTop;

      const firstBlock = blocks[0];
      if (firstBlock) {
        firstBlock.style.position = "sticky";
        firstBlock.style.top = "0";
        firstBlock.style.zIndex = "10";
      }

      for (let i = 1; i < blocks.length; i++) {
        const block = blocks[i];
        if (!block) continue;

        const overlapProgress = Math.min(1, Math.max(0, scrollTop / 300));

        const translateY = -overlapProgress * (block.offsetHeight * 0.6);
        
        const isLastBlock = (room!.isLux && i === 2) || (!room!.isLux && i === 1);
        const transformLimit = isSafari && isLastBlock ? -500 : -1000;
        
        if (translateY < transformLimit) {
          block.style.transform = `translateY(${translateY}px)`;
        }

        block.style.zIndex = `${20 + i}`;
      }
      
      setTimeout(() => {
        isScrollingContainer.current = false;
      }, 100);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    let resizeHandler: (() => void) | null = null;
    if (isSafari) {
      resizeHandler = () => {
        setTimeout(() => {
          if (container) {
            const threshold = 50;
            const isAtBottom = 
              Math.abs((container.scrollHeight - container.scrollTop) - container.clientHeight) < threshold;
            
            if (isAtBottom) {
                setLastComfortSection(true);
            }
          }
        }, 100);
      };
      window.addEventListener('resize', resizeHandler);
    }

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (isSafari && resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
    };
  }, [setLastComfortSection, isSafari]);

  useEffect(() => {
    if (!lastBlockRef.current) return;
    
    const observer = new IntersectionObserver(
      () => {
        if (isScrollingContainer.current) return;
      },
      { 
        threshold: [0.1, 0.9]  
      }
    );
    
    observer.observe(lastBlockRef.current);
    
    return () => {
      if (lastBlockRef.current) {
        observer.unobserve(lastBlockRef.current);
      }
    };
  }, [setLastComfortSection, hasShownLastBlock]);

  useEffect(() => {
    lastScrollPosition.current = window.pageYOffset;
    let isScrolling = false;
    
    const handleWindowScroll = () => {
      if (isScrollingContainer.current) return;
      
      if (isScrolling) return;
      isScrolling = true;
      
      const currentScrollPosition = window.pageYOffset;
      const scrollDiff = Math.abs(currentScrollPosition - lastScrollPosition.current);
      scrollDistance.current = scrollDiff;
      
      lastScrollPosition.current = currentScrollPosition;
      
      if (!lastBlockRef.current) return;
      
      setTimeout(() => {
        isScrolling = false;
      }, 50);
    };
    
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [setLastComfortSection]);

  if (!icons || !room) return null;

  const commonProps = {
    imgStyle: {
      ammentiesImageFst: room.about.ammetiveImgStyleFst,
      ammentiesImageScd: room.about.ammetiveImgStyleScd,
    },
    mobileImages: room.about.ammentiesMobileImages,
  };

  const standardStyle = {
    bgColor: "bg-[#EDE8E5]",
    text: "text-[#6B6B6B]",
    headerColor: "text-black",
  };

  const luxStyle = {
    bgColor: "bg-[#A47762]",
    text: "text-[#E1E1E1]",
    headerColor: "text-white",
  };

  const setBlockRef = (index: number) => (el: HTMLDivElement | null) => {
    blocksRefs.current[index] = el;
    if ((room.isLux && index === 2) || (!room.isLux && index === 1)) {
      lastBlockRef.current = el;
    }
  };

  return (
    <div 
      ref={wrapperRef}
      className="relative 2xl:h-[43vw] xl:h-[45.22vw] lg:h-[48vw]  overflow-y-auto scrollbar-hide"
    >
      <div
        className="h-full relative overflow-y-auto scrollbar-hide"
        ref={containerRef}
        style={{
          perspective: "800px",
          scrollBehavior: "smooth",
          ...(isSafari && {
            minHeight: "120%",
            WebkitOverflowScrolling: "touch"
          })
        }}
      >
        {room.isLux ? (
          <>
            <div
              ref={setBlockRef(0)}
              className="w-full sticky top-0"
              style={{
                transition: "transform 0.3s ease-out",
              }}
            >
              <ComfortsBlock
                title={t("room.comfortBlock.title")}
                icons={icons.ammentiesInRoom}
                {...commonProps}
                images={[
                  room.about.ammentiesImages[0],
                  room.about.ammentiesImages[1],
                  room.about.ammentiesMobileImages[0],
                ]}
                style={luxStyle}
                type={room.type}
              />
            </div>

            {icons.bedRoom && (
              <div
                ref={setBlockRef(1)}
                className="w-full sticky top-0"
                style={{
                  transition: "transform 0.3s ease-out",
                }}
              >
                <ComfortsBlock
                  title={t("room.comfortBlock.title2")}
                  icons={icons.bedRoom}
                  {...commonProps}
                  images={[
                    room.about.ammentiesImages[2],
                    room.about.ammentiesImages[3],
                    room.about.ammentiesMobileImages[1],
                  ]}
                  style={standardStyle}
                  type={room.type}
                />
              </div>
            )}

            <div
              ref={setBlockRef(2)}
              className="w-full relative z-10"
              style={{
                transition: "transform 0.3s ease-out ",
              }}
            >
              <ComfortsBlock
                title={t("room.comfortBlock.title3")}
                icons={icons.bathRoom}
                {...commonProps}
                images={[
                  room.about.ammentiesImages[4],
                  room.about.ammentiesImages[5],
                  room.about.ammentiesMobileImages[2],
                ]}
                style={standardStyle}
                type={room.type}
              />
            </div>
          </>
        ) : (
          <>
            <div
              ref={setBlockRef(0)}
              className="w-full"
              style={{
                transition: "transform 0.3s ease-out",
              }}
            >
              <ComfortsBlock
                title={t("room.comfortBlock.title4")}
                icons={icons.ammentiesInRoom}
                {...commonProps}
                images={[
                  room.about.ammentiesImages[0],
                  room.about.ammentiesImages[1],
                  room.about.ammentiesMobileImages[0],
                ]}
                style={standardStyle}
                type={room.type}
              />
            </div>

            <div
              ref={setBlockRef(1)}
              className="w-full sticky top-0"
              style={{
                transition: "transform 0.3s ease-out",
              }}
            >
              <ComfortsBlock
                title={t("room.comfortBlock.title3")}
                icons={icons.bathRoom}
                {...commonProps}
                images={[
                  room.about.ammentiesImages[2],
                  room.about.ammentiesImages[3],
                  room.about.ammentiesMobileImages[1],
                ]}
                style={standardStyle}
                type={room.type}
              />
            </div>
          </>
        )}
        
        {isSafari && (
          <div style={{ height: '150px', minHeight: '150px' }} />
        )}
      </div>
    </div>
  );
};
