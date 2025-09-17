import { MenuItem, MenuModifier } from '@iqra-assistant/shared'

interface MenuDisplayProps {
  menu: { items: MenuItem[]; modifiers: MenuModifier[] }
}

export function MenuDisplay({ menu }: MenuDisplayProps) {
  const { items, modifiers } = menu

  // Group modifiers by group
  const modifiersByGroup = modifiers.reduce((acc, modifier) => {
    if (!acc[modifier.modifier_group]) {
      acc[modifier.modifier_group] = []
    }
    acc[modifier.modifier_group].push(modifier)
    return acc
  }, {} as Record<string, MenuModifier[]>)

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Menu</h2>
      
      {/* Menu Items */}
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                )}
              </div>
              <span className="text-lg font-bold text-primary-600">
                ${item.base_price.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-500 capitalize">
              {item.category}
            </div>
          </div>
        ))}
      </div>

      {/* Modifiers */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Modifiers</h3>
        <div className="space-y-4">
          {Object.entries(modifiersByGroup).map(([group, groupModifiers]) => (
            <div key={group}>
              <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                {group}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {groupModifiers.map((modifier) => (
                  <div
                    key={modifier.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-600">{modifier.name}</span>
                    <span className={`font-medium ${
                      modifier.price_adjustment > 0 
                        ? 'text-green-600' 
                        : modifier.price_adjustment < 0 
                        ? 'text-red-600' 
                        : 'text-gray-500'
                    }`}>
                      {modifier.price_adjustment > 0 ? '+' : ''}
                      ${modifier.price_adjustment.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

