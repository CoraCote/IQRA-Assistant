-- Insert sample menu items (pizzas)
INSERT INTO menu_items (name, description, base_price, category) VALUES
('Margherita Pizza', 'Classic tomato sauce, fresh mozzarella, and basil', 12.99, 'Pizza'),
('Pepperoni Pizza', 'Tomato sauce, mozzarella, and pepperoni', 14.99, 'Pizza'),
('Supreme Pizza', 'Tomato sauce, mozzarella, pepperoni, sausage, bell peppers, onions, and mushrooms', 18.99, 'Pizza'),
('BBQ Chicken Pizza', 'BBQ sauce, mozzarella, grilled chicken, red onions, and cilantro', 16.99, 'Pizza'),
('Veggie Delight', 'Tomato sauce, mozzarella, bell peppers, onions, mushrooms, black olives, and tomatoes', 15.99, 'Pizza');

-- Insert sample modifiers
INSERT INTO menu_modifiers (name, price_adjustment, modifier_group) VALUES
-- Sizes
('Small (10")', -3.00, 'Size'),
('Medium (12")', 0.00, 'Size'),
('Large (14")', 3.00, 'Size'),
('Extra Large (16")', 6.00, 'Size'),

-- Crust
('Thin Crust', 0.00, 'Crust'),
('Regular Crust', 0.00, 'Crust'),
('Thick Crust', 1.50, 'Crust'),
('Gluten-Free Crust', 3.00, 'Crust'),

-- Extra Toppings
('Extra Cheese', 2.00, 'Toppings'),
('Extra Pepperoni', 2.50, 'Toppings'),
('Extra Sausage', 2.50, 'Toppings'),
('Extra Mushrooms', 1.50, 'Toppings'),
('Extra Bell Peppers', 1.50, 'Toppings'),
('Extra Onions', 1.50, 'Toppings'),
('Extra Black Olives', 1.50, 'Toppings'),
('Extra Tomatoes', 1.50, 'Toppings'),

-- Special Instructions
('Well Done', 0.00, 'Cooking'),
('Light on Cheese', 0.00, 'Cooking'),
('Extra Sauce', 0.00, 'Cooking'),
('No Sauce', 0.00, 'Cooking'),

-- Drinks
('Coca-Cola', 2.50, 'Drinks'),
('Pepsi', 2.50, 'Drinks'),
('Sprite', 2.50, 'Drinks'),
('Water', 1.50, 'Drinks'),
('Iced Tea', 2.00, 'Drinks'),

-- Sides
('Garlic Bread', 4.99, 'Sides'),
('Caesar Salad', 6.99, 'Sides'),
('Chicken Wings (6 pieces)', 8.99, 'Sides'),
('Mozzarella Sticks (6 pieces)', 5.99, 'Sides');

