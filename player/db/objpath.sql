create proc tempobjpath
@p_id int ,@path output
AS
select @path=title
from objtank 
where p_id = @p_id
GO

declare @p_id_ int ,@path_ varchar
set @p_id_ = 5488
exec tempobjpath @p_id_ ,@path_ output
select @path_




select * , '../../fileaccess.aspx?filename=/reports/suppot_proc/media/[尸兄]第16集_hd.mp4' as objpath 
from objtank 
where p_id = 5488 and node_id = 5504



select * from  mxwi_new.dbo.objtank where p_id = 5488

drop procedure findName  
  
create procedure findName 
AS  
 declare @result VARCHAR output
 begin  
  Declare curObjtank Cursor for   
  with cte_root(node_id,p_id,NAME)
	as
	(
	    select node_id,p_id,NAME
	    from mxwi_new.dbo.objtank
	    where node_id = 5504   
	    union all

	    select a.node_id,a.p_id,a.NAME
	    from mxwi_new.dbo.objtank a
	    inner join 
	    cte_root b          
	    on a.node_id=b.p_id
	)
  select NAME from cte_root ; 
    
  Open curObjtank    
  Fetch Next From curObjtank Into @result
  While ( @@Fetch_Status=0 )     
        begin  
        @result = @result + '/';
     Fetch Next From curObjtank into @result
       end    
   Close curObjtank  
 Deallocate curObjtank   
 end  
  
declare @r output;
exec findName @r