window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
  activateMenuAtCurrentSection(deposition)
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2

  // verificar se a seção passou da linha
  // quais dados vou precisar?
  const sectionTop = section.offsetTop
  const sectionHeight = section.offsetHeight
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

  // verificar se a base está abaixo da linha alvo

  const sectionEndsAt = sectionTop + sectionHeight
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

function showNavOnScroll() {
  const navigation = document.querySelector('#navigation')
  if (scrollY > 0) {
    navigation.classList.add('scroll')
  } else {
    navigation.classList.remove('scroll')
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

function cardSwap(event) {
  const el = event.target
  let parent = el.parentElement
  while (!parent.classList.contains('button')) {
    parent = parent.parentElement
  }
  const selectedbutton = document.querySelector(`#deposition .button.selected`)
  selectedbutton.classList.remove('selected')
  parent.classList.add('selected')
  let index = parseInt(parent.dataset.index)
  const transition = document.querySelectorAll('#deposition .transition')
  transition.forEach(transition => [transition.classList.add('hidden')])
  transition[index].classList.remove('hidden')
}

let curSlide = 0

const slides = document.querySelectorAll('.mobile')

// loop through slides and set each slides translateX property to index * 100%
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`
})

// select next slide button
const nextSlide = document.querySelector('.vector.forward')

// add event listener and next slide functionality
nextSlide.addEventListener('click', function () {
  curSlide++

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${35 * (indx - curSlide)}%)`
  })
})

// select prev slide button
const prevSlide = document.querySelector('.vector.backward')

// add event listener and navigation functionality
prevSlide.addEventListener('click', function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide
  } else {
    curSlide--
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${35 * (indx - curSlide)}%)`
  })
})

ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700
}).reveal(`
  #home, 
  #home img, 
  #home .stats, 
  #services,
  #services header,
  #services .card
  #about, 
  #about header, 
  #about .content,
  #deposition,
  #deposition .cards, 
  #deposition .logos`)
