/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const questions = [
  { id: 1, options: [{ label: '黄昏', value: 'A' }, { label: '凌晨', value: 'B' }] },
  { id: 2, options: [{ label: '旧书店', value: 'A' }, { label: '花市', value: 'B' }] },
  { id: 3, options: [{ label: '雨停之前', value: 'A' }, { label: '雨停之后', value: 'B' }] },
  { id: 4, options: [{ label: '镜子里的自己', value: 'A' }, { label: '照片里的自己', value: 'B' }] },
  { id: 5, options: [{ label: '熄灭的蜡烛', value: 'A' }, { label: '还没点亮的灯', value: 'B' }] },
  { id: 6, options: [{ label: '一个人喝酒', value: 'A' }, { label: '散场之后的安静', value: 'B' }] },
  { id: 7, options: [{ label: '窗帘被风掀起来', value: 'A' }, { label: '门被轻轻关上', value: 'B' }] },
  { id: 8, options: [{ label: '没寄出的信', value: 'A' }, { label: '读了很多遍的回信', value: 'B' }] },
  { id: 9, options: [{ label: '茶刚泡进去，叶子还在水里慢慢沉，颜色还没出来，你把杯子端在手里等着', value: 'A' }, { label: '喝完了，空杯还有余温，底部留了一点茶垢，放在那里，没洗', value: 'B' }] },
  { id: 10, options: [{ label: '打了一半，停下来，全删掉了，那半句话是什么，只有你知道', value: 'A' }, { label: '发出去了，对方已读，没有回', value: 'B' }] },
  { id: 11, options: [{ label: '末班车还没来，站台上还有几个人，夜风从隧道那头吹过来', value: 'A' }, { label: '末班车开走了，你没赶上，站台上只剩下你', value: 'B' }] },
  { id: 12, options: [{ label: '某句话你还记得，记得那个人的脸，记得当时是白天还是晚上', value: 'A' }, { label: '那句话你还记得，但那个人的声音，你已经不记得了', value: 'B' }] },
  { id: 13, options: [{ label: '用了很多年的旧台灯，灯罩有点焦黄了，但还亮着', value: 'A' }, { label: '搬家时扔掉的那盏灯，到了新地方才想起，原来一直都是它', value: 'B' }] },
  { id: 14, options: [{ label: '窗玻璃上起了雾气，你用手指写了几个字，还没写完', value: 'A' }, { label: '雾气散了，窗还是那扇窗，什么都没留下', value: 'B' }] },
  { id: 15, options: [{ label: '睡着前最后停在某件事上，或者某个人，没有结论，就这样睡过去了', value: 'A' }, { label: '早上醒来，第一个念头还没成形，就飘走了', value: 'B' }] },
  { id: 16, options: [{ label: '一个故事讲了一半，那个人说等下次再讲完，那个未完的结尾你记着', value: 'A' }, { label: '故事讲完了，很好，然后就散了，讲完之后的那种安静', value: 'B' }] },
];

const results = [
  {
    minA: 0,
    maxA: 4,
    title: '灯灭之后',
    content: `你总是等到灯灭了，才发现房间还暖着。雨停了，别人都出门了，你还坐着，不是因为懒，是因为你的感受比别人慢几分钟，要等到安静了，才找到路进来。有人开了一半的窗，你替他关好；没喝完的茶，你端过来放到一边。这不是距离，是你爱事情的方式，悄悄地，等它全沉下去了，你再靠过去。

一首歌结束了，你发现自己还在那里坐着，不知道停了多久。别人说"好了好了，散了吧"，你站起来，跟着走，心里的某样东西还没收好，只是先揣着。有人走了，你会在他刚才坐过的地方停一下，不为什么，就是停一下。

你不大说"当下"的感受，不是没有，是那个感受还没到你这里，你得等它。等它绕过那些人声，等它穿过那段热闹，等它在安静里找到你，然后你才知道，原来那个时候你是那样的。

所以你的爱，总是带着一点时差。等到对方已经不需要了，你的心还在路上，还没到。这不是遗憾，只是你的节奏就是这样，慢半拍，但每一步都踩到实处。`
  },
  {
    minA: 5,
    maxA: 8,
    title: '窗帘和风',
    content: `你像那道被风掀起一半的窗帘，里面和外面都沾一点，两边都是你。感受得到，但不会完全沉进去；喜欢，但留着一只眼睛清醒。人们觉得你好相处，又觉得有点摸不透，其实你只是把最喜欢的那部分先留着，确认好了才慢慢拿出来。一个人喝酒的时候，杯子旁边放着手机，想发消息，也可以不发。你只是一直在同时照管两样东西，一边是你，一边是你在意的那个方向。

在热闹的地方，你会悄悄给自己留个出口，不是要走，只是确认出口在。喜欢的东西，第一次遇见不一定拿，等过几天，想起来了，那才是真的喜欢，才去。喜欢的人，你会先退后一步，不是冷淡，是要看清楚，确认这个喜欢站得住，再走近。

情绪不是压着，是先放在旁边，等有空了再看。别人倾完了，散了，你回去再打开那只盒子，里头是你那天的一点什么，等着你来收拾。

所以你很少让人摸透。但那不是你的问题，只是你的东西，要等稳了才拿出来，拿出来的那点，是真的。`
  },
  {
    minA: 9,
    maxA: 12,
    title: '黄昏的脾气',
    content: `你喜欢事情还没结束的时候，因为那时候什么都还是可能的。雨还没停，天还没全黑，那封信还没寄出去，这些时刻你待得最久。你的难过也是当时就来的，来不及等，一波接着一波，都是真的。旧书店你去得比花市多，新的也喜欢，只是旧的东西有一种气味，是时间压在里面的，别的地方没有。你把很多东西留着，照片，信，那条很久没戴的围巾，说不定哪天用得上，也可能一辈子就这么放着。

有人说"快结束了"，你却觉得快结束了是最难受的时候，因为结束了就是结束了，但还没结束的时候，它还在，还有一点余温，还能再暖一会儿。你喜欢的电影，看完了不急着起身，等片尾字幕滚完了，灯亮了，才站起来。离开一个地方的时候，你会在门口再停一下，转过去看一眼，不一定能记住什么，只是要看一眼。

你的高兴是当时就烧起来的，你的难过也是，不会等，不会慢慢来，来了就是满的。别人以为你容易受伤，其实不是，是你的感受是真的，不是装出来的，也不是夸大了的。

把东西留着，是因为扔掉了就真的没有了，留着至少还在。围巾不戴，但知道它在那个抽屉里，和知道它不在了，是两件事。`
  },
  {
    minA: 13,
    maxA: 16,
    title: '比夜更深',
    content: `黄昏找到你的时候，你已经在里面了，凌晨找到你的时候，你还没出来。你感受事情的方式比别人深，深到有时候要翻出很久以前的什么东西，才能把自己找回来。那面镜子你盯着看的次数，多过任何一张照片，不是自恋，是需要那个会动的、还在的证明。你有很多没寄出的信，或者根本没写，只在脑子里写了又删，因为那些话说出来就不对了，还不如留在里面。在最热闹的地方你也能突然走到很远，然后被人叫一声，你笑着回来，好像什么都没发生。

别人说笑完就忘了，你还在那里转，不是纠结，是某些东西在你这里落地的速度比较慢，落了就沉，沉了就深。旁人说"那只是一件小事"，但你知道，那对你来说不是，只是你没有解释，也没办法解释。

你有很多没有说出来的话，不是憋着，是说出来的版本和里头的那个不一样，说出来就跑偏了，所以留着。有时候深夜打开手机，打了两行，看看，删掉，关上，这个过程你走了很多遍，也没有人知道。

在人群里，你是笑着的，应答着的，你知道怎么在场。但有时候那个人群好像突然隔了一层，声音还在，你已经不在那里了，在某个更早的地方，或者某个你自己也说不清楚的地方。等有人叫你，你回来，笑一下，答一声，接着走，里面那趟远门，没有人知道你去了。`
  }
];

type AppState = 'INTRO' | 'QUIZ' | 'RESULT';

export default function App() {
  const [appState, setAppState] = useState<AppState>('INTRO');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [aCount, setACount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleStart = () => {
    setAppState('QUIZ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (value: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(value);

    setTimeout(() => {
      if (value === 'A') {
        setACount(prev => prev + 1);
      }
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setAppState('RESULT');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 800);
  };

  const handleRestart = () => {
    setAppState('INTRO');
    setCurrentQuestionIndex(0);
    setACount(0);
    setSelectedAnswer(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getResult = () => {
    return results.find(r => aCount >= r.minA && aCount <= r.maxA) || results[0];
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-serif selection:bg-white/20 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px] opacity-30"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          
          {appState === 'INTRO' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-12 sm:space-y-16 md:space-y-20"
            >
              <div className="space-y-8 text-center">
                <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] text-white/90 ml-[0.3em]">
                  内心意象
                </h1>
                <div className="w-12 h-[1px] bg-white/20 mx-auto"></div>
                <p className="text-white/50 tracking-[0.2em] text-sm md:text-base font-sans font-light">
                  凭第一感觉，选出比想法更早到达的那个词
                </p>
              </div>
              
              <button
                onClick={handleStart}
                className="group relative px-10 py-4 overflow-hidden rounded-full border border-white/20 hover:border-white/60 transition-all duration-700"
              >
                <span className="relative z-10 text-sm tracking-[0.3em] uppercase text-white/70 group-hover:text-white transition-colors duration-700 ml-[0.3em]">
                  开始测试
                </span>
                <div className="absolute inset-0 bg-white/10 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 ease-out"></div>
              </button>
            </motion.div>
          )}

          {appState === 'QUIZ' && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[60vh] flex flex-col justify-center items-center w-full"
            >
              <div className="mb-14 sm:mb-20 text-white/40 text-sm tracking-[0.35em] font-sans">
                {String(currentQuestionIndex + 1).padStart(2, '0')} <span className="mx-2 opacity-50">/</span> {questions.length}
              </div>
              
              <div className="w-full space-y-5 sm:space-y-6">
                {questions[currentQuestionIndex].options.map((option, idx) => {
                  const isSelected = selectedAnswer === option.value;
                  const isNotSelected = selectedAnswer && selectedAnswer !== option.value;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      disabled={!!selectedAnswer}
                      className={`w-full text-left p-6 sm:p-7 md:p-10 border rounded-2xl transition-all duration-700 group relative overflow-hidden min-h-[104px] sm:min-h-[112px]
                        ${isSelected ? 'border-white/50 bg-white/10 scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.05)]' : 'border-white/10 hover:bg-white/5 hover:border-white/30'}
                        ${isNotSelected ? 'opacity-20 blur-[4px] scale-[0.98]' : 'opacity-100'}
                      `}
                    >
                      <span className={`relative z-10 text-lg sm:text-xl md:text-2xl leading-8 sm:leading-relaxed break-words transition-colors duration-700 font-medium
                        ${isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}
                      `}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {appState === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-16 py-12"
            >
              <div className="text-center space-y-8">
                <h2 className="text-xs tracking-[0.4em] text-white/30 uppercase font-sans">你的意象</h2>
                <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white ml-[0.2em]">
                  {getResult().title}
                </h1>
              </div>
              
              <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent mx-auto"></div>

              <div className="space-y-6 text-base sm:text-lg md:text-xl leading-[1.95] sm:leading-[2.1] md:leading-[2.2] text-white/70 tracking-wide px-1 sm:px-4 md:px-8">
                {getResult().content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-justify">{paragraph}</p>
                ))}
              </div>

              <div className="pt-24 flex justify-center">
                <button
                  onClick={handleRestart}
                  className="group flex flex-col items-center space-y-3"
                >
                  <span className="text-xs tracking-[0.3em] text-white/30 group-hover:text-white/80 transition-colors duration-500">
                    重新开始
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/80 transition-colors duration-500"></div>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
