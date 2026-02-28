import AngleExplorer from "@/components/widgets/AngleExplorer";
import SymmetryExplorer from "@/components/widgets/SymmetryExplorer";
import AreaModel from "@/components/widgets/AreaModel";
import ExponentExplorer from "@/components/widgets/ExponentExplorer";
import BinaryConverter from "@/components/widgets/BinaryConverter";
import TreeDiagram from "@/components/widgets/TreeDiagram";
import DivisionVisualizer from "@/components/widgets/DivisionVisualizer";
import LogicPlaceholder from "@/components/widgets/LogicPlaceholder";
import SieveExplorer from "@/components/widgets/SieveExplorer";
import FractionNumberLine from "@/components/widgets/FractionNumberLine";
import IntegerLine from "@/components/widgets/IntegerLine";
import FractionMultiply from "@/components/widgets/FractionMultiply";
import DecimalPlaceValue from "@/components/widgets/DecimalPlaceValue";
import ProbabilitySpinner from "@/components/widgets/ProbabilitySpinner";

export const chapterContentMap = {
  1: {
    components: [AngleExplorer, SymmetryExplorer],
    hasDivider: true,
  },
  2: {
    components: [AreaModel],
  },
  3: {
    components: [ExponentExplorer, BinaryConverter],
    hasDivider: true,
  },
  4: {
    components: [TreeDiagram],
  },
  5: {
    components: [DivisionVisualizer],
  },
  6: {
    components: [LogicPlaceholder],
  },
  7: {
    components: [SieveExplorer],
  },
  8: {
    components: [FractionNumberLine],
  },
  9: {
    components: [IntegerLine],
  },
  10: {
    components: [FractionMultiply],
  },
  11: {
    components: [DecimalPlaceValue],
  },
  12: {
    components: [ProbabilitySpinner],
  },
};
