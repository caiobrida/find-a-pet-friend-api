import { Shape, Age, EnergyLevel, IndependenceLevel } from '@prisma/client'

export default interface OrgsPetsSearchQuery {
  age?: Age
  energy_level?: EnergyLevel
  shape?: Shape
  independence_level?: IndependenceLevel
}
