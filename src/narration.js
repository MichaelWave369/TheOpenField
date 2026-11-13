/**
 * Public narration only. Never receive or include a visitor's private notebook,
 * saved topics, or progress in these passages.
 */
export function lessonNarration(lesson) {
  return [
    'The Open Field. Lesson ' + lesson.number + ': ' + lesson.title + '. ' + lesson.subtitle + '.',
    'The idea. ' + lesson.idea,
    'What we can say with care. ' + lesson.lens,
    'One small thing to try. ' + lesson.practice,
    'An open question. ' + lesson.question,
    'A thought to carry. ' + lesson.takeaway,
  ];
}

export function libraryNarration(topic) {
  return [
    'The Open Field Living Library. ' + topic.title + '. ' + topic.subtitle + '.',
    'The idea. ' + topic.summary,
    'What the source supports. ' + topic.grounded,
    'What it does not establish. ' + topic.notClaim,
    'To read the original reference, follow the link on the page. ' + topic.sourceTitle + '.',
    'An open question. ' + topic.question,
  ];
}

export const welcomes = {
  en: {
    lang: 'en-US', name: 'English',
    heading: 'Many languages. One welcome.',
    lead: 'You do not have to share the beliefs of the people around you to belong here. There is room for questions, laughter, quiet, and disagreement.',
    body: 'Keep what helps, question what does not, and leave freely whenever you wish. No membership, payment, or special knowledge is required.',
    quote: 'Nothing is required of you here. Stillness or loudness, all are welcome.',
  },
  es: {
    lang: 'es-ES', name: 'Español',
    heading: 'Muchas lenguas. Una misma bienvenida.',
    lead: 'No necesitas compartir las creencias de quienes te rodean para tener un lugar aquí. Hay espacio para las preguntas, las risas, el silencio y el desacuerdo.',
    body: 'Quédate con lo que te sirva, cuestiona lo que no y vete libremente cuando quieras. No se requiere membresía, pago ni conocimiento especial.',
    quote: 'Aquí no se exige nada de ti. En calma o con entusiasmo, todas las personas son bienvenidas.',
  },
  fr: {
    lang: 'fr-FR', name: 'Français',
    heading: 'De nombreuses langues. Un même accueil.',
    lead: 'Vous n’avez pas besoin de partager les croyances des autres pour avoir votre place ici. Il y a de la place pour les questions, les rires, le silence et le désaccord.',
    body: 'Gardez ce qui vous aide, questionnez ce qui ne vous convient pas, et partez librement quand vous le souhaitez. Ni adhésion, ni paiement, ni savoir particulier ne sont requis.',
    quote: 'Rien n’est exigé de vous ici. Dans le calme ou dans l’enthousiasme, tout le monde est bienvenu.',
  },
};

export function welcomeNarration(welcome) {
  return [welcome.heading, welcome.lead, welcome.body, welcome.quote];
}

export function preferredWelcomeLanguage(navigatorLanguage) {
  const first = (typeof navigatorLanguage === 'string' ? navigatorLanguage : '').split('-')[0].toLowerCase();
  return Object.prototype.hasOwnProperty.call(welcomes, first) ? first : 'en';
}
