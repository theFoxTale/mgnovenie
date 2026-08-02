-- Seed products matching the catalog mockups (prices in rubles).
INSERT INTO products (
  id, slug, name, subtitle, price, volume_ml, burn_hours, material, wick,
  scent_notes, purpose, composition, size, badge, description, image, gallery, featured, is_hit
) VALUES
('1', 'hvoinyi-les', 'Хвойный лес', 'пихта, кедр, ель', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['пихта','кедр','ель'], ARRAY['для дома','для подарка'], ARRAY['пчелиный воск','эфирные масла'], 'medium', 'хит',
 'Аромат свежего хвойного леса наполняет пространство чистотой и спокойствием.',
 '/products/hvoinyi-les.webp', ARRAY['/products/hvoinyi-les.webp','/products/hvoinyi-les-2.webp','/products/hvoinyi-les-3.webp'], TRUE, TRUE),
('2', 'med-i-polyn', 'Мёд и полынь', 'мёд, полынь, ваниль', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['мёд','полынь','ваниль'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Тёплый медовый аромат с лёгкой горечью полыни и мягкой ванилью.',
 '/products/med-i-polyn.webp', ARRAY['/products/med-i-polyn.webp'], TRUE, FALSE),
('3', 'uyutnyi-vecher', 'Уютный вечер', 'тепло и комфорт', 2200, 120, 28, 'пчелиный воск', 'деревянный',
 ARRAY['амбра','ваниль'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Мягкий вечерний аромат для спокойного отдыха.',
 '/products/uyutnyi-vecher.webp', ARRAY['/products/uyutnyi-vecher.webp'], TRUE, FALSE),
('4', 'dikii-med', 'Дикий мёд', 'сладость природы', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['мёд','прополис'], ARRAY['для подарка'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Насыщенный медовый аромат с природной глубиной.',
 '/products/dikii-med.webp', ARRAY['/products/dikii-med.webp'], TRUE, FALSE),
('5', 'teplyi-dom', 'Тёплый дом', 'корица, апельсин, гвоздика', 2200, 120, 32, 'пчелиный воск', 'деревянный',
 ARRAY['корица','апельсин','гвоздика'], ARRAY['для дома','для подарка'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Пряный домашний аромат с цитрусовой свежестью.',
 '/products/teplyi-dom.webp', ARRAY['/products/teplyi-dom.webp'], FALSE, FALSE),
('6', 'utrennii-tuman', 'Утренний туман', 'эвкалипт, мята, шалфей', 2200, 100, 25, 'пчелиный воск', 'деревянный',
 ARRAY['эвкалипт','мята','шалфей'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'small', NULL,
 'Свежий утренний аромат для ясности и лёгкости.',
 '/products/utrennii-tuman.webp', ARRAY['/products/utrennii-tuman.webp'], FALSE, FALSE),
('7', 'tabak-i-vanil', 'Табак и ваниль', 'табак, ваниль, бобы тонка', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['табак','ваниль','бобы тонка'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Глубокий бархатный аромат с тёплой ванилью.',
 '/products/tabak-i-vanil.webp', ARRAY['/products/tabak-i-vanil.webp'], FALSE, FALSE),
('8', 'derevo-i-mokh', 'Дерево и мох', 'дубовый мох, пачули', 2200, 150, 35, 'пчелиный воск', 'деревянный',
 ARRAY['дубовый мох','пачули'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'large', NULL,
 'Землистый лесной аромат с мягкой древесностью.',
 '/products/derevo-i-mokh.webp', ARRAY['/products/derevo-i-mokh.webp'], FALSE, FALSE),
('9', 'les-posle-dozhdya', 'Лес после дождя', 'сосна, земля, кедр', 2200, 120, 30, 'пчелиный воск', 'деревянный',
 ARRAY['сосна','земля','кедр'], ARRAY['для дома'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Свежий влажный лес сразу после летнего дождя.',
 '/products/les-posle-dozhdya.webp', ARRAY['/products/les-posle-dozhdya.webp'], FALSE, FALSE),
('10', 'tsvetushchii-lug', 'Цветущий луг', 'лаванда, ромашка, бергамот', 2200, 120, 28, 'пчелиный воск', 'деревянный',
 ARRAY['лаванда','ромашка','бергамот'], ARRAY['для подарка'], ARRAY['пчелиный воск','эфирные масла'], 'medium', NULL,
 'Лёгкий цветочный аромат летнего луга.',
 '/products/tsvetushchii-lug.webp', ARRAY['/products/tsvetushchii-lug.webp'], TRUE, FALSE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO collections (slug, title, subtitle, image, product_slug) VALUES
('hvoinyi-les', 'Хвойный лес', 'Свежесть и глубина', '/products/hvoinyi-les.webp', 'hvoinyi-les'),
('uyutnyi-vecher', 'Уютный вечер', 'Тепло и комфорт', '/products/uyutnyi-vecher.webp', 'uyutnyi-vecher'),
('dikii-med', 'Дикий мёд', 'Сладость природы', '/products/dikii-med.webp', 'dikii-med'),
('tishina-utra', 'Тишина утра', 'Спокойствие и умиротворение', '/products/utrennii-tuman.webp', 'utrennii-tuman')
ON CONFLICT (slug) DO NOTHING;
