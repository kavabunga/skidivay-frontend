export const authFormErrors = {
  wrongType: 'Введен неверный тип данных',
  wrongName:
    'Имя может содержать только кириллицу, латиницу, пробелы и спецсимволы',
  wrongEmail: 'Неверно указан Email',
  wrongPhone: 'Введен некорректный номер',
  phoneExists: 'Пользователь с таким номером уже существует',
  emailExists: 'Пользователь с таким Email уже существует',
  wrongPasswordCreated:
    'Пароль должен содержать хотя бы одну заглавную, одну строчную буквы и одну цифру. Минимальная длина - 8 знаков.',
  wrongPassword: 'Неверно введен пароль',
  wrongPasswordRepeat: 'Пароли не совпадают',
  userNotFound: 'Пользователь не найден',
  requiredPhone: 'Укажите телефон',
  requiredName: 'Укажите имя',
  requiredPassword: 'Введите пароль',
  requiredEmail: 'Укажите Email',
  required: 'Это поле является обязательным',
};
export const cardFormErrors = {
  minOneSymbol: 'Минимальная длина: 1 символ',
  maxThirtySymbols: 'Максимальная длина: 30 символов',
  maxFortySymbols: 'Максимальная длина: 40 символов',
  wrongType: 'Неверный тип данных',
  wrongShopName:
    'Название магазина может содержать только кириллицу, латиницу, цифры, пробелы и спецсимволы',
  wrongShopGroup:
    'Название категории может содержать только кириллицу, латиницу, цифры, пробелы и спецсимволы',
  wrongCardNumber: 'Некорректный номер карты',
  wrongNumber:
    'Номер может содержать только цифры, буквы и символы «-», « », «_». Максимальная длина - 40 знаков.',
  cardNumberExists: 'Карта была добавлена ранее',
  wrongBarcodeNumber: 'Некорректный штрихкод',
  requiredBarcodeOrNumber: 'Введите номер или штрихкод карты',
  requiredShopName: 'Введите название магазина',
  required: 'Это поле является обязательным',
};
