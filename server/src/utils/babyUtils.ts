import Baby from '../models/Baby';

export const generateBaseId = (
  motherName: string,
  weight: number | undefined,
  gender: string,
  gestationalAge: string
): string => {
  const firstName = motherName.trim().split(' ')[0]!.toUpperCase();
  const genderInitial = gender === 'Male' ? 'M' : 'F';
  const cleanGestationalAge = gestationalAge.replace(/[\-\+]/g, '');
  const weightString = weight ? `${weight}-` : '';
  return `${firstName}-${weightString}${genderInitial}-${cleanGestationalAge}`;
};

export const generateDisplayId = async (
  motherName: string,
  weight: number | undefined,
  gender: string,
  gestationalAge: string,
  excludeBabyId?: string
): Promise<string> => {
  const baseId = generateBaseId(motherName, weight, gender, gestationalAge);

  let displayId = baseId;
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const query: any = { displayId };
    if (excludeBabyId) {
      query._id = { $ne: excludeBabyId };
    }
    const existing = await Baby.findOne(query);
    if (existing) {
      displayId = `${baseId} (${counter})`;
      counter++;
    } else {
      isUnique = true;
    }
  }

  return displayId;
};
