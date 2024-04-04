namespace XmCloudSXAStarter.Workflows
{
    using Sitecore.Data.Items;
    using Sitecore.Workflows;
    using System;

    public class VGWWorkflowCommandAppearance : BasicWorkflowCommandAppearanceEvaluator
    {
        public override WorkflowCommandState EvaluateState(Item item, Item workflowCommand)
        {
            //If user is administrator, skip the logic
            if (Sitecore.Context.User.IsAdministrator)
            {
                return base.EvaluateState(item, workflowCommand);
            }


            if (item.Statistics.UpdatedBy.Equals(Sitecore.Context.User.Name, StringComparison.OrdinalIgnoreCase))
            {
                return WorkflowCommandState.Hidden;
            }

            return base.EvaluateState(item, workflowCommand);

        }
    }
}