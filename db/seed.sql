-- Seed products matching the catalog mockups (prices in rubles).
INSERT INTO products (
  id, slug, name, subtitle, price, volume_ml, burn_hours, material, wick,
  scent_notes, purpose, composition, size, badge, description, image, gallery, featured, is_hit
) VALUES
('1', 'hvoinyi-les', 'Хвойный лес', 'пихта, кедр, ель', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['пихта','кедр','ель'], ARRAY['для дома','для подарка'], ARRAY['пчелиный воск','эфирные масла'], 'medium', 'хит',
 'Аромат свежего хвойного леса наполняет пространство чистотой и спокойствием.',
 '/products/hvoinyi-les.svg', ARRAY['/products/hvoinyi-les.svg'], TRUE, TRUE),
('2', 'med-i-polyn', 'Мёд и полынь', 'мёд, полынь, ваниль', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['мёд','полынь','ваниль'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Тёплый медовый аромат с лёгкой горечью полыни и мягкой ванилью.',
 '/products/med-i-polyn.svg', ARRAY['/products/med-i-polyn.svg'], TRUE, FALSE),
('3', 'uyutnyi-vecher', 'Уютный вечер', 'тепло и комфорт', 2200, 120, 28, 'пчелиный воск', 'деревянный',
 ARRAY['амбра','ваниль'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Мягкий вечерний аромат для спокойного отдыха.',
 '/products/uyutnyi-vecher.svg', ARRAY['/products/uyutnyi-vecher.svg'], TRUE, FALSE),
('4', 'dikii-med', 'Дикий мёд', 'сладость природы', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['мёд','прополис'], ARRAY['для подарка'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Насыщенный медовый аромат с природной глубиной.',
 '/products/dikii-med.svg', ARRAY['/products/dikii-med.svg'], TRUE, FALSE),
('5', 'teplyi-dom', 'Тёплый дом', 'корица, апельсин, гвоздика', 2200, 120, 32, 'пчелиный воск', 'деревянный',
 ARRAY['корица','апельсин','гвоздика'], ARRAY['для дома','для подарка'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Пряный домашний аромат с цитрусовой свежестью.',
 '/products/teplyi-dom.svg', ARRAY['/products/teplyi-dom.svg'], FALSE, FALSE),
('6', 'utrennii-tuman', 'Утренний туман', 'эвкалипт, мята, шалфей', 2200, 100, 25, 'пчелиный воск', 'деревянный',
 ARRAY['эвкалипт','мята','шалфей'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'small', NULL,
 'Свежий утренний аромат для ясности и лёгкости.',
 '/products/utrennii-tuman.svg', ARRAY['/products/utrennii-tuman.svg'], FALSE, FALSE),
('7', 'tabak-i-vanil', 'Табак и ваниль', 'табак, ваниль, бобы тонка', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['табак','ваниль','бобы тонка'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Глубокий бархатный аромат с тёплой ванилью.',
 '/products/tabak-i-vanil.svg', ARRAY['/products/tabak-i-vanil.svg'], FALSE, FALSE),
('8', 'derevo-i-mokh', 'Дерево и мох', 'дубовый мох, пачули', 2200, 150, 35, 'пчелиный воск', 'деревянный',
 ARRAY['дубовый мох','пачули'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'large', NULL,
 'Землистый лесной аромат с мягкой древесностью.',
 '/products/derevo-i-mokh.svg', ARRAY['/products/derevo-i-mokh.svg'], FALSE, FALSE),
('9', 'les-posle-dozhdya', 'Лес после дождя', 'сосна, земля, кедр', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['сосна','земля','кедр'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Свежий влажный лес сразу после летнего дождя.',
 '/products/les-posle-dozhdya.svg', ARRAY['/products/les-posle-dozhdya.svg'], FALSE, FALSE),
('10', 'tsvetushchii-lug', 'Цветущий луг', 'лаванда, ромашка, бергамот', 2200, 120, 28, 'пчелиный воск', 'деревянный',
 ARRAY['лаванда','ромашка','бергамот'], ARRAY['для подарка'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Лёгкий цветочный аромат летнего луга.',
 '/products/tsvetushchii-lug.svg', ARRAY['/products/tsvetushchii-lug.svg'], TRUE, FALSE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO collections (slug, title, subtitle, image, product_slug) VALUES
('hvoinyi-les', 'Хвойный лес', 'Свежесть и глубина', '/products/hvoinyi-les.svg', 'hvoinyi-les'),
('uyutnyi-vecher', 'Уютный вечер', 'Тепло и комфорт', '/products/uyutnyi-vecher.svg', 'uyutnyi-vecher'),
('dikii-med', 'Дикий мёд', 'Сладость природы', '/products/dikii-med.svg', 'dikii-med'),
('tishina-utra', 'Тишина утра', 'Спокойствие и умиротворение', '/products/utrennii-tuman.svg', 'utrennii-tuman')
ON CONFLICT (slug) DO NOTHING;
